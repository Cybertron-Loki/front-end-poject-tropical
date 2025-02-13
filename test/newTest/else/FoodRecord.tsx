import React, { useState, useEffect } from 'react';
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const FoodRecord: React.FC = () => {
    const [formData, setFormData] = useState<{
        shopType: string;
        shopName: string;
        image: File | null;
        category: string;
        foodName: string;
        foodComment: string;
    }>({
        shopType: '',
        shopName: '',
        image: null,
        category: '',
        foodName: '',
        foodComment: ''
    });

    const [shopType, setShopTypes] = useState<string[]>([]);
    const [category, setCategories] = useState<string[]>([]);
    useEffect(() => {
        const fetchShopTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/shop/shopType');
                const result = await response.json();
                console.log('Fetched shop types:', result); // 调试信息
                if (result.success && Array.isArray(result.data)) {
                    setShopTypes(result.data);
                }
                else {
                    console.error('Error fetching shop types:', result.errorMsg);
                }
            } catch (error) {
                console.error('Error fetching shop types:', error);
            }
        };
        fetchShopTypes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        }
    };

    const handleCheckExist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/shop/checkShopExist/${formData.shopType}/${formData.shopName}`);
            const result = await response.json();
            if (result.success) {
                console.log('Shop exists:', result);
                // Handle success (e.g., show a success message)
            } else {
                console.error('Shop does not exist:', result.errorMsg);
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error checking shop existence:', error);
            // Handle error (e.g., show an error message)
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const formDataToSend = new FormData();
        formDataToSend.append('shopType', formData.shopType);
        formDataToSend.append('shopName', formData.shopName);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('foodName', formData.foodName);
        formDataToSend.append('foodComment', formData.foodComment);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
        try {
            const response = await fetch('http://localhost:8080/food/submitFoodInfo', {
                method: 'POST',
                body: formDataToSend
            });
            const result = await response.json();
            if (result.success) {
                console.log('Form submitted successfully:', result);
                // Handle success (e.g., show a success message, reset form, etc.)
            } else {
                console.error('Error submitting form:', result.errorMsg);
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (e.g., show an error message)
        }
    };


    return (
        <body>
            <div className="container mt-3 ">
                <h2 className="rainbowFontColor">select shop by shopType</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row ">
                        <div className="col transform island">
                            <label htmlFor="shopType" className="form-label">
                                select shopType
                            </label>
                            <select className="form-select" id="shopType" name="shopType" value={formData.shopType} onChange={handleChange}>
                                <option value=""></option>
                                {setShopTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col transform island">
                            <label htmlFor="shopName" className="form-label">
                                shop name
                            </label>
                            <input type="text" className="form-control" id="shopName" placeholder="Enter shop name:" name="shopName"
                                value={formData.shopName} onChange={handleChange} />
                            <button className="submitButton" type="button" onClick={handleCheckExist}>
                                <span>check if exsist
                                </span></button>
                            <select className="form-select" id="shopName" name="shopName">
                                <option></option>
                            </select>
                        </div>
                    </div>


                    <div className="category transform island ">
                        <label htmlFor="category" className="form-label">
                            select category
                        </label>
                        <select className="form-select" id="category" name="category" value={formData.category} onChange={(handleChange)}>
                            <option value="">
                            </option>
                            {
                                setCategories.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                            ))
               }
                        </select>
                    </div>
                    <h2 className="rainbowFontColor">input food</h2>
                    <div className="row">
                        <div className="col island part2 transform input-group">

                            <label htmlFor="foodName" className="form-label">
                                input food
                            </label>
                            <div className="input-group mb-3 island ">
                                <input type="text" className="form-control" id="foodName" placeholder="Enter food name:"
                                    name="foodName/" value={formData.foodName} onChange={(handleChange)} />
                            </div>
                            <label htmlFor="foodComment" className="form-label">
                                food comment details
                            </label>
                            <div className="input-group mb-3 island ">
                                <input type="text" className="form-control" id="foodComment" placeholder="Enter food description:"
                                    name="foodComment" value={formData.foodComment} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col island part2 transform">
                            <div className="mb-3  image ">
                                <label htmlFor="imageUpload" className="form-label">Choose an image to upload</label>
                                <input className="form-control" type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} />
                            </div>

                        </div>

                    </div>
                    <button type="submit" className="submitButton ">
                        <span>submit</span>
                    </button>
                </form>

            </div>
        </body>
    )
}

export default FoodRecord;