import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import { mocks } from './mocks'
import LRU_TTL from 'lru-ttl-cache'

dotenv.config()
const app: Express = express()
const port = process.env.SERVER_PORT
const cache= new LRU_TTL({
	max:	100,
	ttl:	'60m',
	ttlInterval: '60s'
})

app.get('/getUserInfo', async (req: Request, res: Response) => {

//    const user = mocks.data.user
   const cached = cache.get(req.query.handle)
   const force = req.query.force
   if(cached && force!=='true'){
    console.log("return cached")
    res.send(cached)
   }else{
       console.log('calling out')
       var result = {}
       try{
          const rawResult = await axios.get(`${process.env.INSTAGRAM_URL}api/v1/users/web_profile_info/?username=${req.query.handle}`, {
            headers: {
              'User-Agent': 'Instagram 219.0.0.12.117 Android'
            }
          })
         const user = await rawResult.data.data.user
        //  const user = mocks.data.user
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

         result = {
          biography: user.biography,
          fullName: user.full_name,
          followerCount: user.edge_followed_by?.count,
          updatedTime: new Date().toISOString(),
          posts
         }
        cache.set(req.query.handle, result)
       } catch (e){
        console.log(e)
        result ={
            error: 'error fetching user info'
        }
       }

     res.send(result)
   }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
});

module.exports = app;

