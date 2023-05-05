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
    return axios.post("https://erpnext.puxeo.com/api/method/login", {
      usr: username,
      pwd: password,
    });
  };

  getUserData = (userId) => {
    return axios.get(`https://erpnext.puxeo.com/api/resource/User/${userId}`);
  };

  getAllUsers = () => {
    return axios.get("https://erpnext.puxeo.com/api/resource/User");
  };

  logout = () => {
    return axios.get("https://erpnext.puxeo.com/api/method/logout");
  };

  checkAuthStatus = (callback) => {
    axios
      .get("https://erpnext.puxeo.com/api/method/frappe.auth.get_logged_user", {
        headers: {
          Authorization: "31f5476617a64a5:0c517a731702e33",
        },
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
