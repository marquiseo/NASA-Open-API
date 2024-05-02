import React from 'react';

const ApodCard = ({ data }) => {
    const { title, date, url, hdurl, explanation } = data;
    const imageUrl = hdurl || url;

    const titleStyle = {
        textAlign: 'center',
        margin: '0 0 20px 0'
    };

    return (
        <div>
            <h3 style={titleStyle}>{title} ({date})</h3>
            <img src={imageUrl} alt={title} style={{ width: '100%', maxHeight: '700px', objectFit: 'cover' }} />
            <p>{explanation}</p>
        </div>
    );
};

export default ApodCard;
