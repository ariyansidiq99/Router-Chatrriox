import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        if(count === 0) {navigate("/"); return;}
        const timer = setTimeout(() => setCount(c => c - 1), 1000);
        return() => clearTimeout(timer);
    }, [count, navigate])
  return (
        <div className='not-found container'>
      <div className='not-found__code'>404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Redirecting to home in {count} seconds...</p>
      <Link to='/' className='btn btn--primary'>Go Home Now</Link>
    </div>

  )
}

export default NotFound