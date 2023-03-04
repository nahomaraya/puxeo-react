import axios from "axios";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASK_LIST = "GET_TASK_LIST";
export const GET_TIMESHEET_LIST = "GET_TIMESHEET_LIST"


export const addTask = (taskData) => dispatch => {
    axios({
        method: "POST",
        url: "https://erp.puxeo.com/api/resource/Task",
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



