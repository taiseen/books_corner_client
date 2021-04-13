import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import fb from '../../icons/fb.png';
import googleLogo from '../../icons/google.png';
import firebase from "firebase/app";
import firebaseConfig from '../FireBase/FireBaseConfig';
import "firebase/auth";
import './Login.css'
import Header from '../Header/Header';

//############################################################
// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
//############################################################


const Login = () => {

    const [loginUser, setLoginUser] = useContext(UserContext);

    console.log(loginUser);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();


    const storeUserToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
    }

    const handleAppLogin = (media) => {

        firebase.auth()
            .signInWithPopup(media)
            .then((result) => {
                // Get User Needful Info...
                const { displayName, email, photoURL } = result.user;
                console.log(result.user);

                // creating a new object...
                const signInUser = {
                    name: displayName,
                    email,
                    photo: photoURL,
                }
                console.log(signInUser);

                storeUserToken();
                setLoginUser(signInUser);
                history.replace(from);

            }).catch(error => console.log(error));
    }

    return (
        <div>
            <Header />
            {
                // conditional rendering...
                (loginUser.name || loginUser.email) ?

                    <div className="user_Info">
                        <h2 className="showHeading">Your Login Info </h2>

                        <div className="uInfo">
                            <h3>Name : </h3> <h3>{loginUser.name}</h3>
                        </div>

                        <div className="uInfo">
                            <h3>Email : </h3> <h3>{loginUser.email || 'email is missing'}</h3>
                        </div>

                        <button className="logOutBtn" onClick={() => setLoginUser({})}>Logout</button>
                    </div>
                    :
                    <>
                        <div class="login_area">
                            <h3>Login</h3>

                            <form action="">
                                <input type="text" placeholder="Email" class="inputField inputStyle" />
                                <input type="password" placeholder="Password" class="inputField inputStyle" />

                                <div>

                                    <label htmlFor="checkbox" class="labelStyle">
                                        <input type="checkbox" name="" id="" class="inputStyle" />
                        Remember Me</label >

                                    <a >Forget Password?</a>
                                </div>
                                <input type="submit" value="Login" class="loginInput inputStyle" />
                            </form>
                            <p>
                                Don't have an account?
                <a >Create an account</a>
                            </p>
                        </div>

                        <div class="auth_area">
                            <div class="box fb" onClick={() => handleAppLogin(facebook)}>
                                <img src={fb} alt="" />
                                <p>Continue with facebook</p>
                            </div>
                            <div class="box google" onClick={() => handleAppLogin(google)}>
                                <img src={googleLogo} alt="" />
                                <p>Continue with Google</p>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default Login;