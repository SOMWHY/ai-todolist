import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [darkmode, setDarkmode] = useState(() => {
    const darkmodeData = localStorage.getItem("darkmode");
    if (darkmodeData == null) return false;
    return JSON.parse(darkmodeData);
  });

  useEffect(() => {
    localStorage.setItem('darkmode', JSON.stringify(darkmode));
  }, [darkmode]);

  return { darkmode, setDarkmode };
}

