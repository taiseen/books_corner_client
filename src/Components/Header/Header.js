import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
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
                    <li><a>Deals</a></li>
                    <li>
                        <Link to="/login"><a>Login</a></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;