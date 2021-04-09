import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Spinner } from 'react-bootstrap';
import Header from '../Header/Header';
import del from '../../icons/delete.png';
import './Order.css'

const Order = () => {

    const [loginUser, setLoginUser] = useContext(UserContext);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    //console.log( allOrders );


    // const totalQuantity = allOrders.reduce((sum, total) => ({quantity: sum.quantity + total.quantity }),0);

    // console.log("Total: ", totalQuantity.quantity);


    // GET data from server
    // these data show to user for DELETE items or final conforming... 
    useEffect(() => {
        const url = `https://blueberry-surprise-27043.herokuapp.com/allOrders?email=${loginUser.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setAllOrders(data)
            })
            .catch(error => console.log(error))
    }, [allOrders]);



    const handleDelete = (id) => {
        const userClick = window.confirm('Are you sure to delete this record?');
        if (userClick) {
            const url = `https://blueberry-surprise-27043.herokuapp.com/deleteOrder/${id}`;
            //const url = `http://localhost:5000/deleteOrder/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // if (data) {
                    //     alert('Delete Successfully...')
                    // }
                });
        }
    }

    const totalQuantity = allOrders.reduce((order, { quantity }) => order + quantity, 0);
    const totalPrice = allOrders.reduce((order, { price }) => order + parseFloat(price), 0);

    // console.log(totalQuantity);
    // console.log(totalPrice.toFixed(2));

    const goToCheckOut = () => {
        console.log('go to check out page...');
    }
    return (
        <div>
            <Header />

            <div className="order">
                <h2>Your Order</h2>
            </div>
            <div className="book_list_container">

                <table className="orderTable">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                                <Spinner animation="border" variant="primary" className="spinner" /> :
                                allOrders.map(order => {
                                    const { name, email, bookName, price, quantity } = order;

                                    return <tr>
                                        <td>{bookName}</td>
                                        {/* <td><input type="number" name="" value={quantity} id=""/></td> */}
                                        <td>{quantity}</td>
                                        <td>${(price * quantity).toFixed(2)}</td>
                                        <td>
                                            <img src={del} alt="" onClick={() => handleDelete(order._id)} />
                                        </td>
                                    </tr>
                                })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Quantity and Prise</th>
                            <th>{totalQuantity}</th>
                            <th>${totalPrice.toFixed(2)}</th>
                            <th onClick={goToCheckOut} className="checkOut">CheckOut</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Order;