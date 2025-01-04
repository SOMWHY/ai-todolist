import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import './App.css'

import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

    <App />
    </BrowserRouter>
  </React.StrictMode>,
)

document.addEventListener("DOMContentLoaded", function() {
  const lazyBackgrounds = document.querySelectorAll(".lazy-background");
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.backgroundImage = `url(${img.dataset.bg})`;
        observer.unobserve(img);
      }
    });
  });
  
  lazyBackgrounds.forEach(img => imageObserver.observe(img));
});
