import React, { useState } from 'react';
import '../../styles/app.css';

export default function Post() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', price);

        const files = document.querySelector('#files').files;

        let i = 0;
        while(i < files.length) {
            formData.append('files', files[i]);
            i++;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch('/products', {
                    method: 'POST',
                    body: formData
                })

                const data = await response.json();

                console.log(data.productId);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct();
    }

    return (
        <div>
            <div className="component-size">
                <div className="component-padding">
                    <div className="form-container">
                        <h2 className="form-caption">Post Product</h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor="name">Name</label>
                            <input id="name" className="form-field" type="text" value={name} autoComplete="off" required onChange={(e) => setName(e.target.value)}/>
                            <label htmlFor="price">Price</label>
                            <input id="price" className="form-field" type="number" value={price} required onChange={(e) => setPrice(e.target.value)}/>
                            <label htmlFor="files">Images</label>
                            <input id="files" className="form-field" type="file" accept="image/png, image/jpeg" multiple required/>
                            <button className="form-submit-btn" type="submit">Submit</button>
                        </form>
                        <div className="link-container">
                            <a className="link" href="/">Return home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}