import axios, { AxiosResponse } from 'axios';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import * as redis from 'redis';
import { YOGIYO } from './constants';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

var GoogleStrategy = OAuth2Strategy;

const APP_URL = `//localhost:4200`;
const PORT = 8253;
const app = express();

const STORE_LIST: string[] = ['462893', '508204', '270108'];

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

/** session 설정 */
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'com.pizza.combination.jp',
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
    req.session.user = req.user;
    req.session.save();
    console.log('sessionId: ', req.sessionID);
    res.redirect(APP_URL + '/shop');
  }
);

app.get('/api/auth/getuser', (req, res) => {
  const { user } = req.session;
  if (user) {
    res.json({ data: req.session.user });
  } else {
    res.sendStatus(200);
    // res.sendStatus(401);
  }
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    req.logout();
    console.error('session destroy failed: ', err);
    res.sendStatus(500);
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
        redisClient.setex(key, 86400, JSON.stringify(response.data));
        console.log('redis에 저장 성공: ', key);
        resolve(response.data);
      }
    })
  );

app.get('/api/shop', (req, res) => {
  res.json({ data: STORE_LIST });
});

/** 가게 기본 정보 호출 */
app.get('/api/shop/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;
    if (req.params.shopId == null) {
      res.sendStatus(400);
    }
    const key = `shop.${shopId}`;
    const data = await getFromRedis(
      key,
      `${YOGIYO.apiHost}/v1/restaurants/${shopId}`
    );
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.get('/api/shop/:shopId/stats', async (req, res) => {
  res.json({
    data: {
      due: '2021-10-25T15:00:00+09:00',
      ordered_users: ['a', 'b', 'c'],
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
    const key = `info.${shopId}`;
    const data = await getFromRedis(
      key,
      `${YOGIYO.apiHost}/v1/restaurants/${shopId}/info/`
    );
    res.json({ data });
  } catch (e) {
    console.error(e);
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
    const key = `menu.${shopId}`;
    const data = await getFromRedis(
      key,
      `${YOGIYO.apiHost}/v1/restaurants/${shopId}/menu/` +
        '?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery'
    );
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

/** 장바구니 수신 */
app.post(`/api/order`, async (req, res) => {
  try {
    // console.log(req.headers)
    console.log(req.body);
    res.json({ data: 'ok' });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
