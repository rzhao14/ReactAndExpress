import React, { useCallback, useState } from 'react';
import './App.css';
import UserInfo from './components/UserInfo';

function App() {
  const [data, setData] = useState<any>(null);
  const [handle, setHandle] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleSubmit = useCallback(() => {
      if(handle && handle!==''){
          fetch(`/getUserInfo?handle=${handle}&force=${forceUpdate}`)
            .then((res) => res.json())
            .then((data) => setData(data))
      }
  }, [handle, forceUpdate])

  const handleClear = useCallback(() => {
    setData(null)
}, [])

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
     setData(null)
     setHandle(e.target.value)
 }
 const handleChange = () => {
  setForceUpdate(!forceUpdate);
};

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
         Please choose Instagram handle:
             <select onChange={handleSelect}>
             <option value='' key='empty'>--</option>
                {handles.map((handle)=>{
                  return <option value={handle} key={handle}>{handle}</option>
                })}
             </select>
         or type:
         <input type="text" name="handle" onChange={(e) => setHandle(e.target.value)} value={handle}/>
         <input type="submit" value="Get" onClick={handleSubmit} />
         <input type="submit" value="clear" onClick={handleClear} />
         Force Update?
         <input type="checkbox"           
                checked={forceUpdate}
                onChange={handleChange} />
        </div>
        {data && <UserInfo data={data}/>}
    </div>
  );
}

export default App;
