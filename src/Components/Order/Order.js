import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Order = () => {

    const [loginUser, setLoginUser] = useContext(UserContext);

    const [allOrders, setAllOrders] = useState([]);

    const { name, email, bookName, price, quantity } = allOrders;

    console.log({ allOrders });

    // GET data from server
    useEffect(() => {
        //const url = `http://localhost:5000/allOrders`;
        //const url = `http://localhost:5000/allOrders?email=${loginUser.email}`;
        const url = `https://blueberry-surprise-27043.herokuapp.com/allOrders?email=${loginUser.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllOrders(data)
            })
            .catch(error => console.log(error))
    }, [])







    return (
        <div>
            <Header />

            <h1>Order Page</h1>

            <ul>
                {
                    allOrders.map( order => {
                        const { name, email, bookName, price, quantity } = order;
                        
                        return <li>{name} and {email} and {bookName } and {price} </li>
                    })
                }
            </ul>
        </div>
    );
};

export default Order;