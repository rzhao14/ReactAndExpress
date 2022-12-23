import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const app: Express = express()
const port = process.env.SERVER_PORT;

app.get('/getUserInfo', async (req: Request, res: Response) => {
    const username = 'mavrckco'
    const test = await axios.get(`${process.env.INSTAGRAM_URL}api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        'User-Agent': 'Instagram 219.0.0.12.117 Android'
      }
    })
   const result = await test.data.data
  res.send(result)
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
});

