import React, { useEffect, useState } from 'react';
import ApodCard from './ApodCard';
import useApodStore from "../../store/useApodStore";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { apodData, error, fetchApodByDate, fetchTodayApod } = useApodStore();
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    useEffect(() => {
        fetchTodayApod();
    }, [fetchTodayApod]);

    useEffect(() => {
        if (date) {
            fetchApodByDate({ date });
        }
    }, [date, fetchApodByDate]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
        fetchApodByDate({ date: e.target.value });
    };

    return (
        <div>
            <div className="navbar">
                <Link to="/" style={{ backgroundColor: 'black', padding: '10px 20px', borderRadius: '10px' }}>Home</Link>
                <Link to="/gallery" style={{ backgroundColor: 'black', padding: '10px 20px', borderRadius: '10px', marginLeft: '10px' }}>Gallery</Link>
            </div>
            <h1 className="apod-title">Astronomy Picture of the Day</h1>
            <div className="date-selector">
                <input type="date" value={date} onChange={handleDateChange} />
            </div>
            {error && <p className="error">{error}</p>}
            {apodData && apodData.length > 0 ? <ApodCard data={apodData[0]} /> : <p>No APOD data available for this date.</p>}
        </div>
    );
};

export default Home;
