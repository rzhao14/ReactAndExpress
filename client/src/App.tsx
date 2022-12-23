import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);
  const [handle, setHandle] = useState('');

  const handleSubmit = useCallback(() => {
    fetch('/getUserInfo?handle=' + handle )
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

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
             <select onChange={(e) => setHandle(e.target.value)}>
                {handles.map((handle)=>{
                  return <option value={handle} key={handle}>{handle}</option>
                })}
             </select>
         or type:
         <input type="text" name="handle" onChange={(e) => setHandle(e.target.value)} value={handle}/>
         <input type="submit" value="Submit" onClick={handleSubmit} />
        </div>
        <div>result</div>
        <div> {JSON.stringify(data)}</div>
    </div>
  );
}

export default App;
