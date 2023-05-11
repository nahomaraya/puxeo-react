import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";
import { erpNextAuthService } from "app/services/erpnext/erpnextAuthService";

class Auth extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.props.setUserData(localStorageService.getItem("auth_user"));
   
    this.checkErpNextAuth()
    // this.checkFirebaseAuth();
  }

  checkJwtAuth = () => {
    jwtAuthService.loginWithToken().then(user => {
      this.props.setUserData(user);
    });
  };

  checkFirebaseAuth = () => {
    firebaseAuthService.checkAuthStatus(user => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        console.log(user.emailVerified);
      } else {
        console.log("not logged in");
      }
    });
  };

  checkErpNextAuth = () => {
    erpNextAuthService.checkAuthStatus(user => {
      if (user) {
        console.log(user)
        // User is already authenticated, set user data from local storage
        this.props.setUserData(user);
        console.log("authebitcated")
      } else {
        console.log("non authienticated")
      }

    })

    // if (authUser) {
    //   // User is already authenticated, set user data from local storage
    //   this.props.setUserData(authUser);
    //   console.log("authebitcated")
    // } else {
    //   console.log("non authienticated")
    //   // User is not authenticated, try to log in with credentials
    //   // const username = "your-username";
    //   // const password = "your-password";

    //   // erpNextAuthService.login(username, password)
    //   //   .then(response => {
    //   //     // Authentication successful, retrieve user data and set state
    //   //     const userId = response.data.full_name;
    //   //     erpNextAuthService.getUserData(userId)
    //   //       .then(response => {
    //   //         const user = {
    //   //           id: userId,
    //   //           name: response.data.full_name,
    //   //           email: response.data.email,
    //   //           // Addwatson@example.com any other user data you need here
    //   //         };
    //   //         this.props.setUserData(user);
    //   //         localStorageService.setItem("auth_user", user);
    //   //       })
    //   //       .catch(error => {
    //   //         // Handle error retrieving user data
    //   //       });
    //   //   })
    //   //   .catch(error => {
    //   //     // Handle authentication error
    //   //   });
    // }
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(mapStateToProps, { setUserData })(Auth);
