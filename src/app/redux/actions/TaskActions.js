import axios from "axios";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASK_LIST = "GET_TASK_LIST";
export const GET_TIMESHEET_LIST = "GET_TIMESHEET_LIST"


let tokenStr = "token 31f5476617a64a5:0c517a731702e33"
const headers = {
  "Authorization" : `${tokenStr}`,
  "Accept": "application/json",
  "Content-Type": "application/json",
 

 
}

export const  getTaskList = () => async  (dispatch) => {
  try{
 await axios.get("/api/resource/Task?q=proxy",
  {
    headers: headers
  },
 
  )
  
  .then(response =>
    
    dispatch(
    {
      type: GET_TASK_LIST,
      payload: response.data
    }
  ))

  
  

  // const data = (await response).data;
  // console.log(data);
  // dispatch({
  //     type: GET_ABOUT_LIST,
  //     payload: data
  //   });
  console.log("Sucess");

 
}
catch (err) {
  console.log(err)
}
}
;


export const addTask = (taskData) => dispatch => {
    axios({
        method: "POST",
        url: "https://erpnext.puxeo.com/api/resource/Task",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",         
        },
        data: taskData,
      })
      .then(res => {
        console.log("res", res.data.message);
      }).
      then(res => {
        dispatch({
          type: ADD_TASK,
          payload: res.data
        });
      }).
      catch(err => {
        console.log("error in request", err);
      });
}



