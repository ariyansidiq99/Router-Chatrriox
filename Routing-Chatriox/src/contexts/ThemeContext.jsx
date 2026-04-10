import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider{{children}} {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("chatriox-theme") || 'light';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("chatriox-theme", theme);
  },[theme]);

  function toggleTheme () {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }
  function setLightTheme () {setTheme("light");}
  function setDarkTheme () {setTheme("dark");}

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, setLightTheme, setDarkTheme}} >
    {children}
</ThemeContext.Provider>
  )
}

export function useTheme () {
  const ctx = useContext(ThemeContext);
  if(!ctx) throw new Error("Usetheme must be used inside themeprovider");
  return ctx;
};