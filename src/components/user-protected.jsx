import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Outlet } from 'react-router-dom';

export function UserProtectedRoute() {
  const [cookies,setcookie,removecookie] = useCookies(['username']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.username) {
      navigate('/user-login'); // Redirect to login if not authenticated
    }
  }, [cookies.username, navigate]);

  return cookies.username ? <Outlet /> : null; // Render the protected component if authenticated
}