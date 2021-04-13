import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars } from '@fortawesome/free-solid-svg-icons'


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
                <label htmlFor="checked" class="check_label">
                    <i class="fas fa-bars"></i>
                </label>
                <input type="checkbox" name="" id="checked" />
                
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