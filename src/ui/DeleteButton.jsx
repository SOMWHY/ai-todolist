import  { useRef } from 'react';

import Button from './Button';

export default function DeleteButton({ onClick, className }) {
  const buttonRef = useRef(null);



  return (
    <Button
      ref={buttonRef}
      mode='delete'
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    />
      
  );
}

