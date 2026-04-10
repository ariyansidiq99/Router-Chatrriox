import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const FAKE_USERS = [
  { id: 1, name: 'Ariyan Sidiq', email: 'ariyan@chatriox.com', role: 'admin',    avatar: 'AS' },
  { id: 2, name: 'Ahmad Khan',   email: 'ahmad@chatriox.com',  role: 'manager',  avatar: 'AK' },
];

export function AuthProvider ({children}) {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("chatriox-user");
    if(saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);
}

async function login(email, password) {
  await new Promise(r => setTimeout(r, 800));
  const found = FAKE_USERS.find(u => u.email === email);
  if(!found || password !== 'password123'){
    throw new Error("invalid email or password");
  }
  setUser(found);
  localStorage.setItem('chatriox-user', JSON.stringify(found));
  return found;

  function logout () {
    setUser(null);
    localStorage.removeItem('chatriox-user');
  }
    const value = useMemo(() => ({
    user,
    loading,
    isAuth: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
  }), [user, loading]);

  if(loading) return <div className="app-loading">Loading...</div>;
  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
export function useAuth ( ){
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
  
}
