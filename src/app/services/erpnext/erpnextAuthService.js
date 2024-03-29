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
    return axios.post("/api/method/login", 
    
    {
      usr: username,
      pwd: password,
    });
  };

  getUserData = (userId) => {
    return axios.get(`/api/resource/User/${userId}`);
  };

  getAllUsers = () => {
    return axios.get("/api/resource/User");
  };

  logout = () => {
    return axios.get("/api/method/logout");
  };

  checkAuthStatus = (callback) => {
    axios
      .get("/api/method/frappe.auth.get_logged_user", {
     
        auth: {
          username: "25780e2360f025d",
          password: "afec298ebaa3d92"
        }
      })
      .then((response) => {
        if (response.data && response.data.message) {
          callback(response.data.message.user);
        } else {
          callback(null);
        }
      })
      .catch((error) => {
        callback(null);
      });
  };
}

export const erpNextAuthService = new ErpNextAuthService();
