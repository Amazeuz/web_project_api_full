
import './App.css';
import { React, useState, useEffect } from 'react';


function App() {
  const [token, setToken] = useState('');
  localStorage.setItem('jwt', res.token)

  setToken(localStorage.getItem('jwt'))

  useEffect(() => {
    setToken(token)
  }, [])

  return (
    <main>
      <div>Coisas</div>
    </main>
  )
}

export default App;
