export default function Star({onStarItem,id,important}){


    return <label htmlFor="star" className="inline-block bg-malibu-200 w-10 rounded-md h-10">

    <input type="checkbox" name="star" id="star" 
    checked={important}
    onChange={(e)=>onStarItem(id,e.target.checked)}
    className="invisible"/>
    </label>
}