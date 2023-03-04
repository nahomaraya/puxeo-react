export async function loginUser(email, password) {
 
 
    return fetch('https://erpnext.puxeo.com/api/method/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usr: email,
        pwd: password
      }
      )
     
    
    })
   
     
   }

