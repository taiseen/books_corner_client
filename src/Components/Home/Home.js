import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookBox from '../BookBox/BookBox';
import './Home.css'
import searchIcon from '../../icons/search.png';
import { Spinner } from 'react-bootstrap';


const Home = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log(allBooks);
    // GET data from server
    useEffect(() => {
        const url = `https://blueberry-surprise-27043.herokuapp.com/allBooks`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setAllBooks(data)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <>
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

            <div className="main_home">
                <div className="search">
                    <img src={searchIcon} alt="" />
                    <input type="text" placeholder="Search Your Book" />
                    <button>Search</button>
                </div>



                <div className="books_container">
                    {
                        loading ?
                            <Spinner animation="border" variant="primary" /> :
                            allBooks.map(book => <BookBox key={book._id} bookInfo={book} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Home;