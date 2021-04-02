import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import fb from '../../icons/fb.png';
import googleLogo from '../../icons/google.png';
import firebase from "firebase/app";
import firebaseConfig from '../FireBase/FireBaseConfig';
import "firebase/auth";
import './Login.css'

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

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const google = new firebase.auth.GoogleAuthProvider();
    const facebook = new firebase.auth.FacebookAuthProvider();

    const handleAppLogin = (media) => {

        firebase.auth()
            .signInWithPopup(media)
            .then((result) => {
                // Get User Needful Info...
                const { displayName, email, photoURL } = result.user;

                // creating a new object...
                const signInUser = {
                    name: displayName,
                    email,
                    photo: photoURL,
                }
                console.log(signInUser);
                setLoginUser(signInUser);
                history.replace(from);

            }).catch(error => console.log(error));
    }



    return (
        <div>
            <header>
                <div>
                    <h1>Development</h1>
                    <h5>Books Corner</h5>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/home"><a>Home</a></Link></li>
                        <li>
                            <Link to="/order"><a>Order</a></Link>
                        </li>
                        <li>
                            <Link to="/admin/allBookList"><a>Admin</a></Link>
                        </li>
                        <li><a>Deals</a></li>
                        <li>
                            <Link to="/login"><a>Login</a></Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {
                // conditional rendering...
                (loginUser.name || loginUser.email) ?

                    <h1>Your Are LoggedIn </h1>

                    :
                    <>
                        <div class="login_area">
                            <h3>Login</h3>

                            <form action="">
                                <input type="text" placeholder="Email" class="inputField inputStyle" />
                                <input type="password" placeholder="Password" class="inputField inputStyle" />

                                <div>

                                    <label for="checkbox" class="labelStyle">
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