import React, { useContext, useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import './Home.css'
import searchIcon from '../../icons/search.png';
import { Spinner } from 'react-bootstrap';
import Header from '../Header/Header';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const Home = () => {

    const [loginUser, setLoginUser] = useContext(UserContext);
    const { name, email } = loginUser;

    const [allBooks, setAllBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [searchBook, setSearchBook] = useState('');
    const [getSearchBook, setGetSearchBook] = useState([]);

    const history = useHistory();

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


    const handleBuyNow = (bookInfo) => {
        //console.log(bookInfo);

        const { _id, bookName, price } = bookInfo;

        if (name || email) {

            let orderedBook;

            const exist = allBooks.find(a => a._id === _id)
            console.log(exist);
            // if(exist){
            //     setSelectedBooks(
            //         allBooks.map( a => a._id === _id ? {...exist, ty: exist.qty + 1} : a)
            //     );                
            // }else{
            //     setSelectedBooks()
            // }
            orderedBook = {
                bookId: _id,
                bookName,
                price,
                quantity,
                time: new Date(),
            }

            const orderByUser = { ...loginUser, ...orderedBook };

            console.log(selectedBooks);
            setSelectedBooks(orderByUser);

            // allBooks.forEach(book => {
            //     if (book._id == _id) {
            //         setQuantity(quantity + 1);
            //     }
            // })

            //let order = { ...selectedBooks, ...bookInfo }


            // Object.keys(orderByUser).forEach(function(bookName) {
            //     if (orderByUser[bookName] == orderedBook.bookName) {
            //       //alert('exists');
            //       setQuantity(quantity + 1);
            //     }
            //   });

            // for (let bookName in orderByUser) {
            //     if (orderByUser[bookName] === orderedBook.bookName) {
            //         //alert(`${orderByUser[bookName]} - exists`);
            //     }
            // }

            //console.log({orderByUser});

            const url = `https://blueberry-surprise-27043.herokuapp.com/bookOrder`;
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderByUser)
            })
                .then(response => response.json())
                .then(result => {
                    // return true||false
                    //console.log(result);
                    // if(result){
                    //     alert(`${bookName} Added...`)
                    // }
                })
                .catch(err => console.log(err));
        } else {
            history.push('/login')
        }
    }

    const handleSearch = (e) => {
        //console.log(e.target.value);

        setSearchBook(e.target.value);

        //const searchValue = e.target.value;
        // const url = `https://blueberry-surprise-27043.herokuapp.com/searchBook`;
        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(searchValue),
        //     headers: { 'Content-Type': 'application/json' },
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err)); 
    }

    console.log(searchBook);
    console.log(getSearchBook);

    useEffect(() => {
        const url = 'https://blueberry-surprise-27043.herokuapp.com/searchingBook?searchBook=' + searchBook;
        fetch(url)
            .then(res => res.json())
            .then(data => setGetSearchBook(data))
            .catch(err => console.log(err));
    }, [searchBook]);

    
    return (
        <>
            <Header />

            <div className="main_home">
                <div className="search">
                    <img src={searchIcon} alt="" />
                    <input type="text" placeholder="Search Your Book" onChange={handleSearch} />
                    <button>Search</button>
                </div>

                <div className="books_container">
                    {
                        loading
                            ? <Spinner animation="border" variant="primary" />
                            : getSearchBook
                                ? getSearchBook.map(book => <BookCard
                                    key={book._id}
                                    bookInfo={book}
                                    handleBuyNow={handleBuyNow} />)
                                : allBooks.map(book => <BookCard
                                    key={book._id}
                                    bookInfo={book}
                                    handleBuyNow={handleBuyNow} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Home;