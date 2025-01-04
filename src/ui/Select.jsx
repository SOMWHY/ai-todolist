export default function Select({name, value, children, className, onChange, ...props}) {
    return (
      <select 
        value={value}
        onChange={onChange}
        name={name} 
        className={`outline-none rounded-md text-center px-1 py-2 font-sans shadow-malibu-600 shadow-sm hover:scale-105 transition-transform select-none ${className}`}
        {...props}
      >
        {children}
      </select>
    )
  }
  
  