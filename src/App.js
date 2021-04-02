import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import AllBooks from './Components/Admin/AllBooks/AllBooks';
import AddBook from './Components/Admin/AddBook/AddBook';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import Order from './Components/Order/Order';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


// 1-April-2021
// after finish ==>> attach output-ui
// Last focus on README file...

const exclusionPaths = [
    '/admin/allBookList',
    '/admin/addBook',
]

export const UserContext = createContext();

const App = () => {

    const [loginUser, setLoginUser] = useState({});

    //const location = useLocation();

    return (

        <UserContext.Provider value={[loginUser, setLoginUser]}>
            <Router>

                {/* {window.location.pathname === '/admin/allBookList' ? null : <Header />} */}

                {/* {exclusionPaths.indexOf(window.location.pathname) < 0 ? null : <Header /> } */}

                {/* <Header /> */}

                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>

                    <PrivateRoute path="/order">
                        <Order />
                    </PrivateRoute>

                    <PrivateRoute path="/admin/allBookList">
                        <AllBooks />
                    </PrivateRoute>

                    <PrivateRoute path="/admin/addBook">
                        <AddBook />
                    </PrivateRoute>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/*">
                        <PageNotFound />
                    </Route>

                </Switch>

            </Router>
        </UserContext.Provider>

    );
};

export default App;