import React from 'react';
import './BookBox.css';

const BookBox = (props) => {

    const { _id, bookName, authorName, price, imageURL } = props.bookInfo;

    const handleBuyNow = () => {
        console.log("Buy...");
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
                    <button onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>

    );
};

export default BookBox;