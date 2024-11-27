import  { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Star({ onStarItem, id, important }) {
  const starRef = useRef(null);

  useEffect(() => {
    if (starRef.current) {
      gsap.set(starRef.current, { scale: 1, rotation: 0 });
    }
  }, []);

  const handleStarClick = (e) => {
    const checked = e.target.checked;
    onStarItem(id, checked);

    if (starRef.current) {
      gsap.set(starRef.current, { scale: 1, rotation: 0 });

      gsap.timeline()
  .to(starRef.current, {
    duration: 0.5,
    scale: checked ? 1.3 : 1,
    rotation: checked ? 360 : 0,
    ease: "elastic.out(1, 0.3)",
  })
  .to(starRef.current, {
    duration: 0.2,
    scale: 1,
    ease: "power2.out",
  });

      if (checked) {
        const burst = Array.from({ length: 5 }).map(() => {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-cerise-red-500 rounded-full';
          starRef.current.appendChild(particle);
          return particle;
        });

        gsap.to(burst, {
          duration: 0.6,
          scale: 0,
          opacity: 0,
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-30, 30),
          onComplete: () => {
            burst.forEach(particle => particle.remove());
          }
        });
      }
    }
  };

  return (
    <label htmlFor={`star-${id}`} className="inline-block cursor-pointer relative">
      <input
        type="checkbox"
        name={`star-${id}`}
        id={`star-${id}`}
        checked={important}
        onChange={handleStarClick}
        className="hidden peer"
      />
      <svg
        ref={starRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${
          important ? "text-cerise-red-500" : "text-cerise-red-100"
        } w-8 h-8 transition-colors duration-200`}
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}

