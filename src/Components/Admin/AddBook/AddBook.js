import React, { useState } from 'react';
import './AddBook.css';
import upload from '../../../icons/upload.png'
import CommonNav from '../CommonNav/CommonNav';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';


const AddBook = () => {

    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        const bookInfo = {
            bookName,
            authorName,
            price,
            imageURL
        }

        //console.log(bookInfo);
        setLoading(true);
        const url = `https://blueberry-surprise-27043.herokuapp.com/addBook`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookInfo)
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                if (result) {
                    alert('Book Added Successfully...');
                }
            })
            .catch(err => console.log(err));

        // clear all input values from input field...
        e.target.reset();
    };

    const handleImageUpload = (event) => {

        //console.log(event.target.files[0]);

        const imageData = new FormData();
        imageData.set('key', 'e6a6e2fab17e156f5aec357902880cea');
        imageData.append('image', event.target.files[0]);
        setLoading(true);

        // uploaded to Imgbb website...
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                //console.log(res.data.data.display_url);
                setLoading(false);
                if (res) {
                    alert('Picture Uploaded Successfully...');
                }
                setImageURL(res.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
                console.log(error.response.request._response);
            });
    }


    return (
        <div className="mani_admin">
            <CommonNav />

            <section className="book_input_area">

                <div className="bannerTitle">

                    <h3>Add Book <span>and <strong>Please Wait for few seconds</strong> after Uploading Book Cover Photo</span></h3>
                    <Link to="/home"><a>Home</a></Link>
                </div>

                <div className="book_form_container">

                    <form onSubmit={handleSubmit} method="post">

                        <div className="book_form">
                            <div className="input_flex">
                                <label htmlFor="book_name">Book Name</label>
                                <input id="book_name" type="text" required
                                    placeholder="Enter Book Name"
                                    onChange={event => setBookName(event.target.value)} />
                            </div>

                            <div className="input_flex">
                                <label htmlFor="author_name">Author Name</label>
                                <input id="author_name" type="text" required
                                    placeholder="Enter Name"
                                    onChange={event => setAuthorName(event.target.value)} />
                            </div>

                            <div className="input_flex">
                                <label htmlFor="price">Add Price</label>
                                <input id="price" type="text" required
                                    placeholder="Enter Price $$$"
                                    onChange={event => setPrice(event.target.value)} />
                            </div>

                            <div className="input_flex file_width">
                                <label>Add Book Cover Photo</label>
                                <label htmlFor="file" className="inputLabel">
                                    <img src={upload} alt="" />
                                                Upload photo</label>
                                <input id="file" type="file" required
                                    className="inputFile" accept="image/*"
                                    onChange={handleImageUpload} />
                            </div>
                        </div>

                        <button className="btn btn-success mt-2" type='submit'>Save</button>
                        {/* <input type="submit" value="Save" className="btn btn-success mt-2" onClick={handleSubmit} /> */}

                    </form>


                </div>

                <span className="spinnerLoading">
                    {
                        loading ? 
                        <Spinner animation="border" variant="primary" /> :
                        null                         
                    }
                </span>
            </section>

        </div>
    );
};

export default AddBook;