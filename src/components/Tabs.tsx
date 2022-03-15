const tabs = [
    'All',
    'Active',
    'Completed',
  ]

const Tabs: React.FC<{
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    activeTab: string
}> = ({setActiveTab, activeTab}) => {
    
  return (
    <div className="mt-10">
        <ul className="flex justify-around w-full max-w-xl m-auto border-b-2">
            {tabs.map((tab:string, index:number)=>{
                return (
                    <li className={activeTab === tab ? 'pb-3 cursor-pointer text-center w-20 border-b-[3px] border-b-blue-500 text-sm font-Montserrat'
                    : 
                    'cursor-pointer text-center w-20 text-sm font-Montserrat'} onClick={(e)=>{
                        setActiveTab(e.currentTarget.innerText)
                    }} key={index}>{tab}</li>
                )
            })}
        </ul>
    </div>
  )
}

export default Tabs