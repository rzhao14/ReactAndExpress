import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import { mocks } from './mocks'

dotenv.config()
const app: Express = express()
const port = process.env.SERVER_PORT;

app.get('/getUserInfo', async (req: Request, res: Response) => {
//     const username = 'mavrckco'
//     const rawResult = await axios.get(`${process.env.INSTAGRAM_URL}api/v1/users/web_profile_info/?username=${username}`, {
//       headers: {
//         'User-Agent': 'Instagram 219.0.0.12.117 Android'
//       }
//     })
//    const user = await rawResult.data.data.user
   const user = mocks.data.user
   const edges = user.edge_owner_to_timeline_media?.edges
   const posts = edges.map((edge:any)=>{
    const node = edge?.node
    const post = {
        postType: node.__typename,
        mediaUrl: node.display_url,
        numberOfLikes: node.edge_liked_by?.count || 0,
        numberOfComments: node.edge_media_to_comment?.count || 0
    }
    return post
   })

   const result = {
    biography: user.biography,
    fullName: user.full_name,
    followerCount: user.edge_followed_by?.count,
    posts
   }
  res.send(result)
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
});

