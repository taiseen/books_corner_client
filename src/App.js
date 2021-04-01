import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import PageNotFound from './Components/PageNotFound/PageNotFound';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Components/FireBase/FireBaseConfig';
import AddEvent from './Components/AddEvent/AddEvent';
import AllBooks from './Components/Admin/AllBooks/AllBooks';
import AddBook from './Components/Admin/AddBook/AddBook';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


// 1-April-2021
// after finish ==>> attach output-ui
// Last focus on README file...

const App = () => {



    return (
        <div >

            <Router>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>

                    <Route path="/order">
                        <AddEvent />
                    </Route>

                    <Route path="/admin/allBookList">
                        <AllBooks />
                    
                    </Route>

                    <Route path="/admin/addBook">
                        <AddBook/>
                    </Route>

                    <Route path="/login">

                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;