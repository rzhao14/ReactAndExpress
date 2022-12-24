import React, { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<any>(null);
  const [handle, setHandle] = useState('');

  const handleSubmit = useCallback(() => {
      if(handle && handle!==''){
          fetch('/getUserInfo?handle=' + handle )
            .then((res) => res.json())
            .then((data) => setData(data))
      }
  }, [handle])

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
     setData(null)
     setHandle(e.target.value)
 }

  const handles = [
    'mavrckco',
    'Otanikotani',
    'haiyang-mavrck',
    'imclarney',
    'MattGirolami'
  ]

  return (
    <div className="App">
      <header className="App-header">
        <p>Get user Info from Instagram</p>
      </header>
        <div>
         please choose Instagram handle:
             <select onChange={handleSelect}>
             <option value='' key='empty'>--</option>
                {handles.map((handle)=>{
                  return <option value={handle} key={handle}>{handle}</option>
                })}
             </select>
         or type:
         <input type="text" name="handle" onChange={(e) => setHandle(e.target.value)} value={handle}/>
         <input type="submit" value="Submit" onClick={handleSubmit} />
        </div>
        <div>result</div>
        <div>
            {data && !data.error &&
            <ul>
            <li>{data.fullName}</li>
            <li>{data.biography}</li>
            <li>{data.followerCount}</li>
            {data.posts.map((post:any)=>{
                return <li>{JSON.stringify(post)}</li>
            })}
            </ul>
            }
        </div>
        <div>{data && data.error &&  <li>{data.error}</li>}</div>
    </div>
  );
}

export default App;
