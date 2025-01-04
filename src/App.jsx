import React, {Suspense, useEffect, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import { useDarkMode } from "./hooks/useDarkMode";
import { useOrderBy } from "./hooks/useOrderBy";
import Header from "./features/Header";
import Operations from "./features/Operations";
import Modal from "./ui/Modal";
import useUndoRedo from "./hooks/useUndoRedo";

import HeaderExtend from "./features/HeaderExtend";
import ContextMenu from "./ui/ContextMenu";
import TodoForm from "./features/TodoForm";
import { Route, Routes } from "react-router-dom";
import BuyMeACoffee from "./features/BuyMeACoffee";
import { Loader } from "react-feather";

// 将大组件改为动态导入
// 替换直接导入
// import TodoItem from './features/TodoItem'

// 改为动态导入
const TodoList = React.lazy(() => import('./features/TodoList'))
export default function App() {
  const { todos, setTodos } = useTodos();
  const { darkmode, setDarkmode } = useDarkMode();
  const { orderBy, setOrderBy, sortTodos } = useOrderBy(setTodos);
  const [showDuplicatedModal, setShowDuplicatedModal] = useState(false);


const [newItem,setNewItem,undo,redo,inputRef]=useUndoRedo("",5)
const [isShowHeaderExtend,setIsShowHeaderExtend]=useState(false)
  
const [isSettingApiKey,setIsSettingApiKey]=useState(false)

  useEffect(() => {
    sortTodos();
  }, [sortTodos]);

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
    <div className={`${darkmode ? "dark" : ""} p-0 box-border w-screen h-screen dark:bg-malibu-900 bg-malibu-600 
    
    `}>
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
     
      <ContextMenu onSubmit={handleSubmit} setIsSettingApiKey={setIsSettingApiKey}/>

      <Routes>
        <Route path='/' element={<TodoForm handleSubmit={handleSubmit}>
        <Header 
             newItemInputRef={inputRef} 
             newItem={newItem} 
             setNewItem={setNewItem} 
             setDarkmode={setDarkmode} 
             todos={todos}
             setIsShowHeaderExtend={setIsShowHeaderExtend}
           />
           <HeaderExtend
           isShowHeaderExtend={isShowHeaderExtend}
           undo={undo}
           redo={redo}
           newItem={newItem}
           setNewItem={setNewItem}
           isSettingApiKey={isSettingApiKey}
           />
           <Operations 
             setTodos={setTodos} 
             todos={todos}
             orderBy={orderBy} 
             setOrderBy={setOrderBy}
           />

           <Suspense fallback={<Loader/>}>
           <TodoList todos={todos} setTodos={setTodos} />

           </Suspense>
      </TodoForm>}/>
        <Route path='/sponsor' element={<BuyMeACoffee/>}/>
    </Routes>
      
    </div>
  );
}


