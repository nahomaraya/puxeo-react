import { GET_TASK_LIST } from "../actions/TaskActions";

const initialState = {
    taskList: []
 }

 const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TASK_LIST:  
        return{
            ...state,
           taskList: action.payload
          };
          default: 
            return {
              ...state
            }
          
    }
 };
 export default taskReducer;