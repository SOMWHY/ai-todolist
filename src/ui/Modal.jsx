import Button from "./Button"

const Modal = ({onConfirm, onCancel, children, confirmText = "confirm", cancelText = "cancel",fullscreen=true,textOnly=false}) => {
   
  return (
    <div 
      onClick={(e) => {
        if (e.target.classList.contains("overlay")) onCancel();
      }}
      className={`overlay  ${fullscreen?"w-screen h-screen":"w-full h-full"}`}
    >
      <div className="modal-content 
        relative
        w-[fit-content] h-[fit-content] bg-malibu-200 dark:bg-malibu-950 rounded-lg p-3
        flex flex-col gap-6  z-[99]"
      >
        {!textOnly&&
        <Button 
        onClick={onCancel}
        className="absolute top-3 right-3 rounded-full bg-malibu-500 w-8 h-8 text-malibu-100 text-4xl font-semibold flex-center"
        >
          &times;
        </Button>
        }
        {children}
        {!textOnly&&
        <footer className="flex justify-evenly text-malibu-950 font-semibold">
          <Button onClick={onConfirm} className="rounded-xl bg-malibu-300 hover:bg-cerise-red-600 hover:text-cerise-red-200">
            {confirmText}
          </Button>
          <Button onClick={onCancel} className="rounded-xl bg-malibu-300/60 hover:bg-malibu-500">
            {cancelText}
          </Button>
        </footer>}
      </div>
    </div>
  )
}

export default Modal

