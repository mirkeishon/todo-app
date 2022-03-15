import { useEffect, useRef, useState } from "react"
import { MdDeleteOutline } from "react-icons/md"
import Task, { Icon } from "./Task"

interface Input {
    id: string,
    details: string,
    checked: boolean
}

const Tasks: React.FC<{
    activeTab: string
}> = ({activeTab}) => {
    const [tasks, setTasks] = useState<Input[]>([])
    const input = useRef<HTMLInputElement>(null)
    const [details, setDetails] = useState('')


    const addTask = ()=>{
        if(details){
            setDetails('')
            setTasks([
                    ...tasks,
                    {
                        id: Date.now().toString(),
                        details: details,
                        checked: false
                    }
                ])
        }
        if(input && input.current){
                input.current.focus()
            }
        
    }
    useEffect(()=>{
        const tasks = localStorage.getItem('todoAppTasks')
        if(tasks !== null){
            setTasks(JSON.parse(tasks))
        }
        
    }, [])

    useEffect(()=>{
        localStorage.setItem('todoAppTasks', JSON.stringify(tasks))
    }, [tasks])

    const handleCheck = (e:any) => {
        const name:string = e.target.name
        const checked : boolean = e.target.checked
        const newList = tasks.map((task)=>{
            return {
                ...task,
                checked: task.id === name ? checked: task.checked
            }
        })
        setTasks(
            newList
        )
    }
    const handleDelete = (id:string) => {
        const newList = tasks.filter((task)=>{
           return task.id !== id
        })
        setTasks(newList)
    }
    const handleDeleteAll = () => {
        const newList = tasks.filter((task)=>{
            return task.checked === false
        })
        setTasks(newList)
    }

  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            addTask()}} className="w-full max-w-xl m-auto p-4">
            {activeTab !== 'Completed' && 
            <div className="flex justify-between mb-4">
                <input ref={input} className="border border-gray-400 p-4 w-full rounded-xl text-sm font-Montserrat" onChange={(e)=>{setDetails(e.currentTarget.value)}} value={details} type="text" placeholder="Add Details" />
                <input className="cursor-pointer py-4 px-8 ml-4 rounded-xl bg-blue-400 text-white text-sm font-Montserrat" type="submit" value="Add" />
            </div>}
            <div>
                {tasks.map((task)=>{
                    const {id} = task
                    if(activeTab === 'Active'){
                        if(task.checked === false){
                            return (
                                <div key={id}>
                                    <Task task={task} handleCheck={handleCheck} />
                                </div>
                            )
                        }
                    }else if(activeTab === 'Completed'){
                        if(task.checked === true){
                           return (
                               <div className="flex items-center justify-between mb-2" key={id}>
                                   <Task task={task} handleCheck={handleCheck}/>
                                   <Icon id={task.id} handleDelete={handleDelete}/>
                               </div>
                            ) 
                        }
                    }else{
                        return (
                            <div key={id}>
                                <Task task={task} handleCheck={handleCheck} />
                            </div>
                        )
                    }
                })}
            </div>
            {activeTab === 'Completed' && 
                <div className="flex justify-end items-center text-sm mt-8">
                    <button onClick={()=>{handleDeleteAll()}} className="flex rounded-lg py-4 px-8 bg-red-500 text-white">
                        <MdDeleteOutline size={20} />
                        delete All    
                    </button>    
                </div>}
        </form>   
    </div>
  )
}

export default Tasks