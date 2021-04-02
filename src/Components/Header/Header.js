import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {

    const [loginUser, setLoginUser] = useContext(UserContext);

    // {
    //     loginUser.name ? loginUser.name : 'Login'
    // }

    return (
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
                    <li>
                        <Link to="/checkout"><a>CheckOut</a></Link>
                    </li>
                    <li>
                        <Link to="/login"><a>
                            {
                                loginUser.name ? loginUser.name : 'Login'
                            }
                        </a></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;