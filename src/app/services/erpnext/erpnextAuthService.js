// export async function loginUser(email, password) {
 
 
//     return fetch('https://erpnext.puxeo.com/api/method/login', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         usr: email,
//         pwd: password
//       }
//       )
     
    
//     })
   
     
//    }


   import axios from "axios";

   class ErpNextAuthService {
     login = (username, password) => {
      console.log(username)
       return axios.post('https://erpnext.puxeo.com/api/method/login', {
         usr: username,
         pwd: password
       });
     };
   
     getUserData = (userId) => {
       return axios.get(`https://erpnext.puxeo.com/api/resource/User/${userId}`);
     };
   
     getAllUsers = () => {
       return axios.get('https://erpnext.puxeo.com/api/resource/User');
     };
   
     logout = () => {
       return axios.get('https://erpnext.puxeo.com/api/method/logout');
     };
   }
   
   export const erpNextAuthService = new ErpNextAuthService();
