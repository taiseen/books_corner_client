import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import CommonNav from '../CommonNav/CommonNav';
import edit from '../../../icons/edit.png'
import del from '../../../icons/delete.png'
import './AllBooks.css';

const AllBooks = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);


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


    const handleEdit = (id) => {
        console.log("Edit ==> ", id);
    }


    const handleDelete = (id) => {
        const userClick = window.confirm('Are you sure to delete this record?');
        if (userClick) {
            const url = `https://blueberry-surprise-27043.herokuapp.com/deleteBook/${id}`;
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

        <div className="mani_admin">

            <CommonNav />

            <section class="book_input_list">
            
                <div class="bannerTitle">
                    <h2>List Of Book's || Total : {allBooks.length}</h2>
                    <Link to="/home"><a>Home</a></Link>
                </div>
            
                <div class="book_list_container">
                    <table>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                    <Spinner animation="border" variant="primary" className="spinner" /> :
                                    allBooks.map(book => {
                                        return <tr>
                                            <td>{book.bookName}</td>
                                            <td>{book.authorName}</td>
                                            <td>${book.price}</td>
                                            <td>
                                                <img src={edit} alt="" onClick={() => handleEdit(book._id)} />
                                                <img src={del} alt="" onClick={() => handleDelete(book._id)} />
                                            </td>
                                        </tr>
                                    })
                            }
                        </tbody>
                    </table>
                    
                </div>
            </section>

        </div >
    );
};

export default AllBooks;