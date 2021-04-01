import React from 'react';
import './CommonNav.css';
import grid from '../../../icons/1grid.png'
import plus from '../../../icons/1plus.png'
import edit from '../../../icons/1edit.png'
import { Link } from 'react-router-dom';


const CommonNav = () => {
    return (

        <section class="sideBar">
            <div class="logo">
                <p>Development</p>
                <h1>Books Corner</h1>
            </div>

            <div class="menu">
                <ul>
                    <Link to="/admin/allBookList">
                        <li>
                            <img src={grid} alt="" />
                            <a>Manage books</a>
                        </li>
                    </Link>

                    <Link to="/admin/addBook">
                        <li>
                            <img src={plus} alt="" />
                            <a>Add book</a>
                        </li>
                    </Link>
                    <li>
                        <img src={edit} alt="" />
                        <a href="">Edit book</a>
                    </li>
                </ul>
            </div>
        </section>

    );
};

export default CommonNav;