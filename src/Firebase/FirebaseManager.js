import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";



export const initializeFirebaseFramework = () => {

  if(firebase.apps.length === 0){

    firebase.initializeApp(firebaseConfig);
  } 
    
}


//handle sign with email and password
export const handleLoginSystem = (data) => {

    return firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then(response => {
        
        const {displayName, email} = response.user;
        const signInWithEmailAndPassword = {
            
            name: displayName,
            email: email,
            success: true,
            error: ""

        };

        return signInWithEmailAndPassword;

    })
    .catch(error => {

        const signInWithEmailAndPasswordError = {
            
            success: false,
            error: error.message
        };

        return signInWithEmailAndPasswordError;
        
    });

}


// handle Register system
export const handleRegisterSystem = (data) => {

    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then(response => {

        const newUserInfo = {

            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            success: true,
            error: ""
        }
        updateUser(`${data.firstName} ${data.lastName}`);
        return newUserInfo;
    })
    .catch(error => {

        const newUserInfoError = {

            success: false,
            error: error.message
        };

        return newUserInfoError;
    });


}



// handle facebook sign in system
export const facebookSignIn = () => {

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(response => {

        const {displayName, email, photoURL} = response.user;
        const facebookSignInUser = {

            name: displayName,
            email: email,
            img: photoURL,
            success: true,
            error: "",

        };

        return facebookSignInUser;

      })
      .catch(error => {

        const facebookSignError = {

            success: false,
            error: error.message
        };

        return facebookSignError;
      });

}



// handle google sign in system
export const googleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(response => {

        const {displayName, email, photoURL} = response.user;
        const googleSignInUser = {

            name: displayName,
            email: email,
            img: photoURL,
            success: true,
            error: ""

        };

        return googleSignInUser;
    
      })
      .catch(error => {

        const googleSignInUserError = {

            success: false,
            error: error.message
        };

        return googleSignInUserError
      });


}

/******* Current User profiles *************/

const updateUser = (name) => {

    const user = firebase.auth().currentUser;
    user.updateProfile({

        displayName: name
    })
    .then(response => {
    
        
    })
    .catch(error => {
    

    });

}