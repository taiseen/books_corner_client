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

    console.log({ allOrders });

    // GET data from server
    useEffect(() => {
        const url = `https://blueberry-surprise-27043.herokuapp.com/allOrders?email=${loginUser.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setAllOrders(data)
            })
            .catch(error => console.log(error))
    }, [])



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
                    if (data) {
                        alert('Delete Successfully...')
                    }
                });
        }
    }



    return (
        <div>
            <Header />

            <div class="order">
                <h2>Your Order</h2>
            </div>
            <div class="book_list_container">

                <table class="orderTable">
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
                                        <td>{quantity}</td>
                                        <td>{price}</td>
                                        <td>
                                            <img src={del} alt="" onClick={() => handleDelete(order._id)} />
                                        </td>
                                    </tr>
                                })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;