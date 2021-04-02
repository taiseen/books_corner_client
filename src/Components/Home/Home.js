import React, { useEffect, useState } from 'react';
import BookBox from '../BookBox/BookBox';
import './Home.css'
import searchIcon from '../../icons/search.png';
import { Spinner } from 'react-bootstrap';
import Header from '../Header/Header';


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
            <Header />

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