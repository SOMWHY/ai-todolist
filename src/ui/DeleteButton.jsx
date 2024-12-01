

import Button from './Button';

export default function DeleteButton({ onClick, className }) {
 



  return (
    <Button
      type="button"
      mode='delete'
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    />
      
  );
}

