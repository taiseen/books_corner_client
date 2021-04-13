import React from 'react';
import './BookCard.css';


const BookCard = ({ bookInfo, handleBuyNow }) => {

    const { bookName, authorName, price, imageURL } = bookInfo;

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
                    <button onClick={() => handleBuyNow(bookInfo)}>Buy Now</button>
                </div>
            </div>
        </div>

    );
};

export default BookCard;