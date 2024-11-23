export default function Star({onStarItem,id,important}){


    return <input type="checkbox" name="star" id="star" 
    checked={important}
    onChange={(e)=>onStarItem(id,e.target.checked)}/>
}