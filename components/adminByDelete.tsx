export default function AdmenFilterByDelete({filterDelete, filterChange }){
  return(
    <div className="row d-flex flex-row-reverse">
        <div className="col-md-4 py-3">
          <select className="form-control" defaultValue={filterDelete} onChange={filterChange}>
            <option value="false">Active Items</option>
            <option value="true">Deleted Items</option>
          </select>
        </div>
      </div>
  )
}