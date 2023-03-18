import {data} from '../../views/app/task-manager/task-dnd/data'

export async function groupItems(list){
  
    list.map((listItem, index)=> {
        data.statusColumns.map((subData, index)=>{
            if(listItem.status == subData.title){
                subData.taskIds.concat(listItem.name)
                console.log("Adding" + listItem.name +"to" + subData.title)
            }
            else{
                console.log("Skipping")
            }

        })
        data.priorityColumns.map((subData, index)=>{
            if(listItem.priority == subData.title){
                subData.taskIds.concat(listItem.name)
            }

        })

    })
    console.log(data.statusColumns)
   
    
}