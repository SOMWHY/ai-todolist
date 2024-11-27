import { Delete, Settings as SettingsIcon, PlusSquare, Trash2, ArrowRight, ArrowLeft } from "react-feather"

export default function Button({ className, mode = "unset", onClick, children, ref,...props }) {
  return (
    <button 
    ref={ref}
      onClick={onClick}
      className={`flex-center p-3 hover:scale-105 transition-transform shadow-sm shadow-malibu-700 active:shadow-inner select-none ${className}`}
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

