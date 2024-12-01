import {useEffect, useRef, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import { useDarkMode } from "./hooks/useDarkMode";
import { useOrderBy } from "./hooks/useOrderBy";
import Header from "./features/Header";
import Operations from "./features/Operations";
import TodoList from "./features/TodoList";
import Modal from "./ui/Modal";
import handleGenerating from "./helpers/fetchApi.mjs";
import Button from "./ui/Button";


export default function App() {
  const { todos, setTodos } = useTodos();
  const { darkmode, setDarkmode } = useDarkMode();
  const { orderBy, setOrderBy, sortTodos } = useOrderBy(setTodos);
  const [showDuplicatedModal, setShowDuplicatedModal] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [isGenerating,setIsGenerating]=useState(false)
  const newItemInputRef = useRef(null);

  


  useEffect(() => {
    // sortTodos();
  }, [todos, sortTodos]);

  function handleAddItem() {
    setTodos(curTodos => [...curTodos, {
      id: crypto.randomUUID(),
      completed: false,
      content: newItem,  
      deadline: new Date(),
      time: Date.now(),
      editable: false,
      important: false,
      active: false,
    }]);
    setNewItem("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem) return;

    if (newItem === todos?.find(todo => todo?.content === newItem)?.content) 
      setShowDuplicatedModal(true);
   
      handleAddItem();
    
  }

  function handleConfirm() {
    setTodos(curTodos => curTodos.slice(0, -1));
    setShowDuplicatedModal(false);
  }
  
  function handleCancel() {
    setShowDuplicatedModal(false);
  }

  return (
    <div className={`${darkmode ? "dark" : ""} p-0 box-border w-screen h-screen dark:bg-malibu-900 bg-malibu-600`}>
      {showDuplicatedModal && (
        <Modal 
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText="delete it"
          cancelText="continue"
        >
          <header className="text-malibu-900 dark:text-malibu-200">
            <h1>Confirm Command</h1>
          </header>
          <main className="text-malibu-900 dark:text-malibu-200">
            <p>You have added the same task, sure to continue?</p>
          </main>
        </Modal>
      )}
      <form 
         
        autoComplete="off"
        className={`flex flex-col items-center w-full max-w-[640px] h-screen rounded-sm px-1 py-1 gap-1 absolute left-[50%] -translate-x-[50%]`} 
        onSubmit={handleSubmit}
      >
        <button type="submit" className="hidden" name="hiddenElForSubmitting"/>
        <Header 
          newItemInputRef={newItemInputRef} 
          newItem={newItem} 
          setNewItem={setNewItem} 
          setDarkmode={setDarkmode} 
          todos={todos}
        />
        <Button 
        type="button"
        onClick={()=>handleGenerating(setIsGenerating,newItem,setNewItem)}
        disabled={isGenerating||!newItem}
        className="dark:bg-malibu-950 rounded-xl dark:text-malibu-200
        bg-malibu-500 text-malibu-950
        font-semibold tracking-tight
        "
        >
        {isGenerating?"Generating":"Make the mess a CLEAN todo title!"}
          
        </Button>
        <Operations 
          setTodos={setTodos} 
          todos={todos}
          orderBy={orderBy} 
          setOrderBy={setOrderBy}
        />
        <TodoList todos={todos} setTodos={setTodos} />
      </form>
    </div>
  );
}


