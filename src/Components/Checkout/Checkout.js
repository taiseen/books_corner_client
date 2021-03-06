import React from 'react';
import './Checkout.css'
import Header from '../Header/Header';

const Checkout = (props) => {

    const { totalQuantity, totalPrice, hello } = props;

    const data = true ;

    console.log(props);
    console.log(totalQuantity);
    console.log(totalPrice);
    console.log('Hello ',hello);

    return (
        <div>
            <Header />
            <div className="main_box">

                {
                    data
                        ? <h1 className="statusWarning">Please Come From <strong>Order</strong> Page... <br/> to show your order details...</h1>
                        : <div className="checked_out_box">

                            <div className="checked_out_box_title">
                                <h2>Your order has been placed</h2>
                                <h1>Order : </h1>
                            </div>

                            <div className="user_info">

                                <div className="row">
                                    <p>Name:</p>
                                    <p>Jamal</p>
                                </div>
                                <div className="row">
                                    <p>Email:</p>
                                    <p>Jamal@gmail.com</p>
                                </div>
                                <div className="row">
                                    <p>Address:</p>
                                    <p>Bangladesh</p>
                                </div>
                                <div className="row">
                                    <p>Date:</p>
                                    <p>14-04-2021</p>
                                </div>
                                <div className="row">
                                    <p>Total:</p>
                                    <p>$110</p>
                                </div>
                                <div className="row">
                                    <p>Card Items:</p>
                                    <p> 4 x Books</p>
                                </div>

                            </div>
                        </div>
                }




            </div>
        </div>
    );
};

export default Checkout;