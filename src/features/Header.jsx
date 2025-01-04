import { useRef, useEffect } from "react";
import Button from "../ui/Button";
import gsap from "gsap";

export default function Header({newItemInputRef, newItem, setNewItem, setDarkmode, todos,setIsShowHeaderExtend}) {
  const headerRef = useRef(null);
  const totalTodos = todos?.length;
  const completedTodos = todos.filter(todo => todo.completed === true).length;
  const realTodos = totalTodos - completedTodos;

  useEffect(() => {
    const header = headerRef.current;
    gsap.set(header, { scaleY: 0, transformOrigin: "top" });
    gsap.to(header, {
      scaleY: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });


    
  }, []);

  return (
    <header ref={headerRef} className=" form-header relative w-full h-[30%] bg-malibu-600 dark:bg-malibu-900 dark:shadow-malibu-600 rounded-md shadow-malibu-800 shadow-md flex flex-col overflow-hidden">
      <label htmlFor="add-newItem" className="my-[auto] flex-center font-bold font-cursive tracking-tight text-8xl text-malibu-950 dark:text-malibu-500/70 select-none w-full h-full">
        {`${(realTodos + "").length > 2 ? "Fuck" : realTodos}${realTodos === 1 ? "Todo" : "Todos"}`}
      </label>
      <input 
        className="undraggble mt-[auto] outline-none bg-malibu-800/80 text-malibu-300 dark:bg-malibu-950/60 dark:text-malibu-200 font-sans pl-3"
        type="text" 
        placeholder="ADD NEW TODO HERE~"
        id="add-newItem"
        ref={newItemInputRef}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onClick={()=>setIsShowHeaderExtend(open=>!open)}
      />
      <Button
        className="undraggble  z-50 absolute top-3 right-3 p-[1.8px] w-[10%] aspect-video min-w-8 max-w-16 rounded-2xl bg-malibu-200/40 hover:bg-malibu-200/60 text-malibu-950 hover:rotate-180 hover:text-malibu-900 dark:text-malibu-300/80
        dark:hover:text-malibu-200 "
        mode="settings" 
        type="button"
        onClick={() => setDarkmode(darkmode => !darkmode)}
      />
    </header>
  );
}

