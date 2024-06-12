import React, { useEffect } from 'react'
import Home from './pages/Home/Home'

const App = () => {
  useEffect(() => {
    const handleScroll= () => {
      const body = document.querySelector('body');
      if (window.scrollY > 0) {
        body.classList.add('fixed-background');
      } else {
        body.classList.remove('fixed-background');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div>
      <div className="background"></div>
      <Home/>
    </div>
  )
}

export default App
