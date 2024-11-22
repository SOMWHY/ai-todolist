export default function Header({newItemInputRef,newItem,setNewItem,setDarkmode}){
   
 return <header className="form-header">
      <label htmlFor="add-newItem">Todos</label>
      <input type="text" 
      placeholder="ADD NEW TODO HERE~"
      id="add-newItem"
      ref={newItemInputRef}
      value={newItem}
      onChange={(e)=>setNewItem(e.target.value)}/>
      <label className="inline-block bg-indigo-300"><input type="button" value="DarkmodeToggle" onClick={()=>setDarkmode(darkmode=>!darkmode)}/></label>
    </header>
}