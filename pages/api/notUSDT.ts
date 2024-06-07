// pages/api/proxy.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const response = await axios.get('https://api.nobitex.ir/v2/orderbook/NOTUSDT');
  
      res.status(response.status).json(response.data);
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
  
