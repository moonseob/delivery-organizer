import axios, { AxiosResponse } from 'axios';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { randomUUID } from 'crypto';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import * as redis from 'redis';
import { promisify } from 'util';
// import { Order } from '../app/shared/models/order.model';
import { YOGIYO } from './constants';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    order: any /* Order */ | null;
  }
}

var GoogleStrategy = OAuth2Strategy;

const APP_URL = `//localhost:4200`;
const PORT = 8253;
const app = express();

let STORE_LIST: { id: string; due: string }[] = [
  { id: '475929', due: new Date().toISOString() },
  { id: '462893', due: new Date().toISOString() },
  { id: '508204', due: new Date().toISOString() },
  { id: '270108', due: new Date().toISOString() },
];

/** CORS 허용 미들웨어 */
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  retry_strategy: (options) => {
    console.error('authRedis connection interruption');
    console.error('Retrying');
    return Math.min(options.attempt * 100, 3000); // 100ms
  },
});
const redisClientGetAsync = promisify(redisClient.get).bind(redisClient);
const MAX_AGE = 86400; // seconds, 1일

/** session 설정 */
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: 'session:',
    }),
    secret: 'com.pizza.combination.jp',
    cookie: { maxAge: MAX_AGE * 1000 },
    resave: true,
    saveUninitialized: true,
  })
);
/** 요청 body에 대해 json 형식 사용 */
app.use(express.json());
/** passport 사용 설정 */
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '571943749312-npf9m3k24i3kaekvsio5ga7pmkdduatb.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8253/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user as any);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    prompt: 'select_account',
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const user = {
      id: (req.user as any).id,
      email: (req.user as any).emails[0].value,
      displayName: (req.user as any).displayName,
    };
    req.session.user = user;
    req.session.save();
    redisClient.set(`user:${user.id}`, JSON.stringify(user));
    res.redirect(APP_URL + '/shop');
  }
);

app.get('/api/auth/getuser', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({ data: user });
  } else {
    res.sendStatus(401);
  }
});

app.get('/auth/logout', (req, res) => {
  console.log('log out from: ', req.session.id);
  req.session.destroy((err) => {
    req.logout();
    if (err != null) {
      console.error('session destroy failed: ', err);
      res.sendStatus(500);
    }
    res.redirect(APP_URL + '/shop');
  });
  console.log('req.session: ', req.session);
});

const getFromRedis = (key: string, axiosURL: string) =>
  new Promise((resolve, reject) =>
    redisClient.get(key, async (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        console.log('redis에서의 응답 성공: ', key);
        resolve(JSON.parse(data));
      } else {
        const response: AxiosResponse = await axios.get(axiosURL, {
          headers: YOGIYO.httpHeader,
        });
        redisClient.setex(key, MAX_AGE, JSON.stringify(response.data));
        console.log('redis에 저장 성공: ', key);
        resolve(response.data);
      }
    })
  );

app.get('/api/shops', async (req, res) => {
  const orders = JSON.parse((await redisClientGetAsync('orders')) ?? '');
  const data = await Promise.all(
    STORE_LIST.map(async ({ id, due }) => {
      const uids = orders
        .filter((order: any) => order.restaurant_id === id)
        .map((order: any) => order.uid);
      return {
        id,
        due,
        ordered_users: await Promise.all(
          uids.map((uid: string) => getUser(uid))
        ),
      };
    })
  );
  res.json({ data });
});

/** 가게 기본 정보 호출 */
app.get('/api/shop/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;
    if (req.params.shopId == null) {
      res.sendStatus(400);
    }
    const key = `shop:${shopId}`;
    const data = await getFromRedis(
      key,
      `${YOGIYO.apiHost}/v1/restaurants/${shopId}`
    );
    res.json({ data });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

async function getUser(uid: string) {
  try {
    const a = await redisClientGetAsync(`user:${uid}`);
    console.log(a);
    return a;
  } catch (err) {
    err instanceof Error && console.error(err.message);
    return null;
  }
}

/** 가게의 정보 호출 */
app.get('/api/shop/:shopId/stats', async (req, res) => {
  const { shopId } = req.params;
  const orders = await redisClientGetAsync('orders');
  const ordered_users = (
    orders != null
      ? await Promise.all(
          (JSON.parse(orders) as any[])
            .filter((order) => order.restaurant_id.toString() === shopId)
            .map((order) => getUser(order.uid))
        )
      : []
  )
    .filter((user) => user != null)
    .map((user) => JSON.parse(user!));
  res.json({
    data: {
      due: '2021-10-25T15:00:00+09:00',
      ordered_users,
    },
  }); // DEBUG
});

/** 가게 정보 호출 */
app.get('/api/shop/:shopId/info', async (req, res) => {
  try {
    const { shopId } = req.params;
    if (req.params.shopId == null) {
      res.sendStatus(400);
    }
    const key = `info:${shopId}`;
    const data = await getFromRedis(
      key,
      `${YOGIYO.apiHost}/v1/restaurants/${shopId}/info/`
    );
    res.json({ data });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

/** 가게의 메뉴 정보 호출  */
app.get('/api/shop/:shopId/menu', async (req, res) => {
  try {
    const { shopId } = req.params;
    if (req.params.shopId == null) {
      res.sendStatus(400);
    }
    const key = `menu:${shopId}`;
    const data = await getFromRedis(
      key,
      `${YOGIYO.apiHost}/v1/restaurants/${shopId}/menu/` +
        '?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery'
    );
    res.json({ data });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

/** 장바구니 수신 */
app.post(`/api/order`, (req, res) => {
  try {
    const { user } = req.session;
    const order = {
      ...req.body,
      uid: user!.id,
      date: new Date().toISOString(),
      id: randomUUID(),
    };
    req.session.order = order;
    redisClient.get('orders', async (err, data) => {
      const prev = JSON.parse(data ?? '[]');
      redisClient.set('orders', JSON.stringify(prev.concat(order)));
    });
    res.json({ data: order });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

/** 주문 1건 삭제 */
app.delete('/api/order/:id', (req, res) => {
  try {
    redisClient.get('orders', async (err, data) => {
      if (!data) {
        return res.status(400).send({ error: 'order not found' });
      }
      const current = JSON.parse(data) as any[];

      const { id } = req.params;
      console.log(current);
      const idx = current.findIndex((order: any /* Order */) =>
        !!id ? order.id === id : order.uid === req.session.user!.id
      );
      if (idx < 0) {
        return res.status(400).send({ error: 'order not found' });
      }
      current.splice(idx, 1);
      req.session.order = null;
      redisClient.set('orders', JSON.stringify(current));
      res.json({ success: true });
    });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

/** 유저별 주문 내역 */
app.get('/api/history', async (req, res) => {
  try {
    const orders = await redisClientGetAsync('orders');
    const uid = req.session.user?.id;
    const data = orders
      ? JSON.parse(orders).filter((odr: any) => odr.uid === uid)
      : [];
    res.json({ data });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

/** 전체 주문 조회 */
app.get('/api/orders', (req, res) => {
  try {
    redisClient.get('orders', async (err, data) => {
      if (!data) {
        return res.status(400).send({ error: '주문 목록이 없음' });
      }
      res.json({ data: JSON.parse(data) });
    });
  } catch (err) {
    err instanceof Error && console.error(err.message);
    res.sendStatus(500);
  }
});

/** 가게 목록 업데이트 */
app.post('/api/admin/shop_list', (req, res) => {
  const { data } = req.body;
  console.log(data.data);
  STORE_LIST = data.data;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
