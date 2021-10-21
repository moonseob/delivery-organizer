(function () {
  console.log('awef');
})();

import cors from 'cors';
import express from 'express';
import { info, menu } from './mock-data';

const PORT = 8253;
const app = express();

app.use(cors());

app.get('/api/shop/:shopId/info', async (req, res) => {
  try {
    const { shopId } = req.params;
    if (req.params.shopId == null) {
      res.sendStatus(404);
    }
    res.json(info); // DEBUG
    // const response: AxiosResponse = await axios.get(
    //   `${YOGIYO.apiHost}/v1/restaurants/${shopId}/info/`,
    //   {
    //     headers: YOGIYO.httpHeader,
    //   }
    // );
    // res.json(response.data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
app.get('/api/shop/:shopId/menu', async (req, res) => {
  try {
    const { shopId } = req.params;
    if (req.params.shopId == null) {
      res.sendStatus(404);
    }
    res.json(menu); // DEBUG
    // const response: AxiosResponse = await axios.get(
    //   `${YOGIYO.apiHost}/v1/restaurants/${shopId}/menu/` /*  +
    //     '?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery' */,
    //   {
    //     headers: YOGIYO.httpHeader,
    //   }
    // );
    // res.json(response.data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
