import React, { useState } from 'react';
import ApodCard from './ApodCard';
import useApodStore from "../../store/useApodStore";
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
    const { rangeOrCountData, error, fetchApodByParams, resetData } = useApodStore();
    const [selection, setSelection] = useState('dateRange');

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {};
        if (selection === 'count') {
            params.count = parseInt(document.querySelector('.input-count').value, 10);
        } else if (selection === 'dateRange') {
            params.start_date = document.querySelector('.input-date.start').value;
            params.end_date = document.querySelector('.input-date.end').value;
        }

        fetchApodByParams(params);
    };

    return (
        <div className="gallery">
            <div className="navbar">
                <Link to="/" style={{ backgroundColor: 'black', padding: '10px 20px', borderRadius: '10px' }}>Home</Link>
                <Link to="/gallery" style={{ backgroundColor: 'black', padding: '10px 20px', borderRadius: '10px', marginLeft: '10px' }}>Gallery</Link>
            </div>
            <h1 className="apod-title">Gallery</h1>
            <form onSubmit={handleSubmit} className="apod-form">
                <select value={selection} onChange={(e) => setSelection(e.target.value)} className="selection-dropdown">
                    <option value="dateRange">Date Range</option>
                    <option value="count">Count</option>
                </select>

                {selection === 'dateRange' && (
                    <div className="input-group">
                        <input type="date" className="input-date start" />
                        <input type="date" className="input-date end" />
                    </div>
                )}
                {selection === 'count' && (
                    <div className="input-group">
                        <input type="number" className="input-count" min="1" />
                    </div>
                )}

                <button type="submit" className="input-button">Submit</button>
            </form>

            {error && <p className="error">{error}</p>}
            <div className="range-or-count-cards">
                {rangeOrCountData.length > 0 ? rangeOrCountData.map((data, index) => <ApodCard key={index} data={data} />) : <p>No data to display. Please adjust the query.</p>}
            </div>
        </div>
    );
};

export default Gallery;
