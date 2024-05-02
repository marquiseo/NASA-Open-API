import React, { useEffect } from 'react';
import ApodCard from './ApodCard';
import useApodStore from "../../store/useApodStore";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { apodData, error, fetchTodayApod } = useApodStore();

    useEffect(() => {
        fetchTodayApod();
    }, [fetchTodayApod]);

    return (
        <div>
            <div className="navbar">
                <Link to="/" style={{ backgroundColor: 'black', padding: '10px 20px', borderRadius: '10px' }}>Home</Link>
                <Link to="/gallery" style={{ backgroundColor: 'black', padding: '10px 20px', borderRadius: '10px', marginLeft: '10px' }}>Gallery</Link>
            </div>
            <h1 className="apod-title">Astronomy Picture of the Day</h1>
            {error && <p className="error">{error}</p>}
            {apodData.length > 0 && <ApodCard data={apodData[0]}/>}
        </div>
    );
};

export default Home;