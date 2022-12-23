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


  return (
    <div className="App">
      <header className="App-header">
        <p>Get user Info from Instagram</p>
      </header>
        <label>
         Instagram handle:
         <input type="text" name="handle" onChange={(e) => setHandle(e.target.value)} value={handle}/>
        </label>
        <input type="submit" value="Submit" onClick={handleSubmit} />
        <div>result</div>
        <div> {JSON.stringify(data)}</div>
    </div>
  );
}

export default App;
