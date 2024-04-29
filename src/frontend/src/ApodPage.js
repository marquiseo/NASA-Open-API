import React from 'react';
import axios from 'axios';
import ApodCard from './ApodCard';
import useApodStore from "../../store/useApodStore";
import './ApodPage.css';

// Set up Axios client for API requests
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/nasa/apod'
});

const ApodPage = () => {
    const { apodData, rangeOrCountData, error, setDateRange, setError, resetData } = useApodStore();
    const [selection, setSelection] = React.useState('');

    const fetchApod = async (queryParams) => {
        setError('');
        try {
            const response = await apiClient.get('/query', { params: queryParams });
            if (selection === 'date') {
                setDateRange({ apodData: Array.isArray(response.data) ? response.data : [response.data] });
            } else {
                setDateRange({ rangeOrCountData: Array.isArray(response.data) ? response.data : [response.data] });
            }
        } catch (err) {
            setError('Failed to fetch APOD data: ' + (err.response?.statusText || err.message));
            console.error('Error fetching APOD data:', err);
        }
    };

    const handleSelectionChange = (e) => {
        setSelection(e.target.value);
        resetData();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let params = {};
        if (selection === 'count') {
            params.count = document.querySelector('.input-count').value;
        } else if (selection === 'dateRange') {
            params.start_date = document.querySelector('.input-date.start').value;
            params.end_date = document.querySelector('.input-date.end').value;
        } else if (selection === 'date') {
            params.date = document.querySelector('.input-date').value;
        }
        resetData();
        fetchApod(params);
    };

    return (
        <div className="apod-page">
            <br />
            <h1 className="apod-title">Astronomy Picture of the Day</h1>
            <br />
            <form onSubmit={handleSubmit} className="apod-form">
                <select value={selection} onChange={handleSelectionChange} className="selection-dropdown">
                    <option value="date">Single Date</option>
                    <option value="dateRange">Date Range</option>
                    <option value="count">Count</option>
                </select>

                {selection === 'date' && (
                    <div className="input-group">
                        <input type="date" className="input-date" />
                    </div>
                )}
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

            <div className="apod-content">
                {error && <p className="error">{error}</p>}
                <div className="apod-cards">
                    {apodData.map((data, index) => (
                        <ApodCard key={index} data={data} />
                    ))}
                </div>
                <div className="range-or-count-cards">
                    {rangeOrCountData.map((data, index) => (
                        <ApodCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApodPage;
