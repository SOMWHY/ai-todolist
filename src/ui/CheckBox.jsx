import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CheckBox({ id, checked, onChange }) {
  const checkboxRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current && svgRef.current) {
      gsap.set(svgRef.current, { 
        scale: checked ? 1 : 0, 
        opacity: checked ? 1 : 0 
      });
    }
  }, [checked]);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    onChange(id, isChecked);

    if (svgRef.current) {
      if (isChecked) {
        gsap.to(svgRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(svgRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }

    if (checkboxRef.current) {
      gsap.to(checkboxRef.current, {
        rotate: isChecked ? 360 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <label htmlFor={`check-item-${id}`} className="relative cursor-pointer">
      <input
        type="checkbox"
        id={`check-item-${id}`}
        onChange={handleChange}
        checked={checked}
        className="sr-only peer"
      />
      <div
        ref={checkboxRef}
        className="w-6 h-6 border-2 border-malibu-950 rounded-full dark:border-malibu-500/80
        peer-checked:bg-malibu-500
        dark:peer-checked:bg-malibu-600 
        peer-checked:border-malibu-500 
        dark:peer-checked:border-malibu-600
        transition-all duration-200 ease-in-out"
      ></div>
      <svg
        ref={svgRef}
        className="absolute w-4 h-4 text-malibu-100 top-1 left-1 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </label>
  );
}

