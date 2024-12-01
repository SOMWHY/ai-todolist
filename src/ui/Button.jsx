import { Delete, Settings as SettingsIcon, PlusSquare, Trash2, ArrowRight, ArrowLeft } from "react-feather"

export default function Button({ className, mode = "unset", onClick, children, ref,disabled,type,...props }) {
  return (
    <button
    type={type} 
      disabled={disabled}
    ref={ref}
      onClick={onClick}
      className={`${disabled ?"opacity-65 cursor-not-allowed":"active:shadow-inner hover:scale-105 cursor-pointer"} flex-center p-3  transition-all shadow-sm shadow-malibu-700  select-none ${className}`}
      {...props}
    >
      {mode === "delete" && <Delete />}
      {mode === "settings" && <SettingsIcon fill="none" size="100%" opacity=".8" strokeWidth="2"/>}
      {mode === "add" && <PlusSquare size="100%"/>}
      {mode === "clear" && <Trash2 size="100%"/>}
      {mode === "right" && <ArrowRight size="100%"/>}
      {mode === "left" && <ArrowLeft size="100%"/>}
      {children}
    </button>
  )
}

