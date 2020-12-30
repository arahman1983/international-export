import useTranslation from "../locals/localHook"
import {DeleteBtn, EditBtn} from '../components'


export default function AdminTable({tableTitles, items}) {
  const { t } = useTranslation()
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
              cols?.map ((item, i:number) =>(
                <tr key={i} className={item[item.length-1] && 'alert-danger'}>
                  {
                    item.map((col,i)=>(
                      <td key={i}>{col}</td>
                    ))
                  }
                  <td>{!item[item.length-1] && <DeleteBtn /> }</td>
                  <td>{ <EditBtn /> }</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  )
}