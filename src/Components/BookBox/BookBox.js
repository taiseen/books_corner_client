import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import './BookBox.css';

const BookBox = ({ bookInfo }) => {

    const [loginUser, setLoginUser] = useContext(UserContext);
    const { _id, bookName, authorName, price, imageURL } = bookInfo;

    const [quantity, setQuantity] = useState(1);

    const { name, email } = loginUser;

    const history = useHistory();

    //console.log(Object.keys(bookInfo));


    const handleBuyNow = (id) => {



        if (name || email) {



            setQuantity(quantity + 1);
            const orderedBook = {
                bookId: _id,
                bookName,
                price,
                quantity,
                time: new Date(),
            };
            

            const orderByUser = { ...loginUser, ...orderedBook };

            // Object.keys(orderByUser).forEach(function(bookName) {
            //     if (orderByUser[bookName] == orderedBook.bookName) {
            //       //alert('exists');
            //       setQuantity(quantity + 1);
            //     }
            //   });

            for (let bookName in orderByUser) {
                if (orderByUser[bookName] === orderedBook.bookName) {
                    //alert(`${orderByUser[bookName]} - exists`);
                }
            }

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
                    console.log(result);
                    // if(result){
                    //     alert(`${bookName} Added...`)
                    // }
                })
                .catch(err => console.log(err));
        } else {
            history.push('/login')
        }
    }

    return (

        <div className="book_box">
            <div className="book_cover_photo">
                <img src={imageURL} alt="" />
            </div>

            <div className="book_info">
                <div className="book_name_and_author">
                    <h3>{bookName}</h3>
                    <p>{authorName}</p>
                </div>
                <div className="book_price_and_buy">
                    <p>${price}</p>
                    <button onClick={() => handleBuyNow(_id)}>Buy Now</button>
                </div>
            </div>
        </div>

    );
};

export default BookBox;