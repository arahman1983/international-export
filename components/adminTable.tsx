import useTranslation from "../locals/localHook"
import {DeleteBtn, EditBtn, ActiveBtn} from '../components'


export default function AdminTable({tableTitles, items, restoreItem, handleDelete, handleEdit}) {
  const cols =  items?.map(item => Object.values(item))
  return (
    <div className="row">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {
              tableTitles.map((title:string, i:number)=> <th key={i} scope="col">{title}</th>)
            }
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            {
              cols?.map ((item:any[], i:number) =>(
                <tr key={i} className={item[item.length-1] == true ? 'alert-danger' : ''}>
                  {
                    item.map((col,i)=>(
                      <td key={i}>{col}</td>
                    ))
                  }
                  <td>{
                  !item[item.length-1]
                  ? <DeleteBtn handleDelete={()=>handleDelete(items.find((tItem) => tItem.id == item[0]))} /> 
                  : <ActiveBtn restoreItem={()=>restoreItem(items.find((tItem) => tItem.id == item[0]))} />  }</td>
                  <td>{<EditBtn handleEdit={()=>handleEdit(items.find((tItem) => tItem.id == item[0]))} />}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  )
}