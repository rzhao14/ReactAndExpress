function UserInfo(props: any) {
    const data = props.data

    return (
        <>
        <ul>User Info Result:</ul>
        <div>
            {data && !data.error &&
            <>
              <ul>
              <li>Full Name: {data.fullName}</li>
              <li>Bio: {data.biography}</li>
              <li>followers: {data.followerCount}</li>
              <li>updated: {data.updatedTime}</li>
              </ul>
              <ul>
              Most Recent POSTS:
              </ul>
              <table >
                <thead> 
                    <tr>
                    <th>Type</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>url</th>
                    </tr>
                </thead>
                <tbody>
                {data.posts.map((post:any)=>{
                  return <tr key={post.mediaUrl}>
                    <td>{post.postType.substring(5)}</td>
                    <td>{post.numberOfLikes}</td>
                    <td>{post.numberOfComments}</td>
                    <td>{post.mediaUrl}</td>
                  </tr>
               })}
                </tbody>
              </table>
            </>
            }
        </div>
        <div>{data && data.error &&  <li>{data.error}</li>}</div>
        </>
    )
}

export default UserInfo;