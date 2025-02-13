import React, { useState, useEffect } from 'react';
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ShopInfoForm: React.FC = () => {
    const [formData, setFormData] = useState<{
        shopType: string;
        shopName: string;
        image: File | null;
    }>({
        shopType: '',
        shopName: '',
        image: null
    });
    const [shopTypes, setShopTypes] = useState<string[]>([]);

    useEffect(() => {
        // Fetch shop types from the backend
        const fetchShopTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/shop/shopType'); // Adjust the URL as needed
                const result = await response.json();
                console.log('Fetched shop types:', result); // 调试信息
                if (result.success && Array.isArray(result.data)) {
                    setShopTypes(result.data);
                } else {
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
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await fetch('http://localhost:8080/shop/submitShopInfo', {
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
        <div className="record-shop-main container">
            <h2 className="rainbowFontColor">Input Shop Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col transform island">
                        <label htmlFor="shopType" className="form-label">
                            Select Shop Type
                        </label>
                        <select
                            className="form-select"
                            id="shopType"
                            name="shopType"
                            value={formData.shopType}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            {shopTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col transform island">
                        <label htmlFor="shopName">Shop Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="shopName"
                            placeholder="Enter shop name:"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                        />
                        <button className="submitButton" type="button" onClick={handleCheckExist}>
                            <span>Check if exist</span>
                        </button>
                    </div>
                </div>
                <div className="col transform island">
                    <label htmlFor="imageUpload" className="form-label">Choose an image to upload</label>
                    <input
                        className="form-control"
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="submitButton">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    );
};

export default ShopInfoForm;