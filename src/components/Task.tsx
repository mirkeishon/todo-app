import { MdDeleteOutline } from "react-icons/md"

const Task: React.FC<{
    task?: {
        id: string,
        details: string,
        checked: boolean
    },
    handleCheck: (e:any) => void
}> = ({task, handleCheck}) => {
    return (
    <label className={`text-lg font-Montserrat inline-flex items-center cursor-pointer ${task?.checked && 'line-through'}`}>
        <input checked={task?.checked} 
        onChange={(e)=>{handleCheck(e)}} 
        name={task?.id} 
        type="checkbox" 
        className="mr-2 h-7 w-7 cursor-pointer"/>
        {task?.details}
    </label>
  )
}

export default Task

const Icon = ({id, handleDelete}:{id:string, handleDelete: (id:string)=> void})=>{
    return (
        <div className="cursor-pointer" onClick={()=>{handleDelete(id)}}>
            <MdDeleteOutline size={25} color={'rgb(156 163 175)'}/>
        </div>
    )
}

export { Icon };