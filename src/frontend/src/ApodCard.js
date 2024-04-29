import React from 'react';

const ApodCard = ({ data }) => {
    const { title, date, url, explanation } = data;
    const titleStyle = {
        textAlign: 'center',
        margin: '0 0 20px 0'
    };

    return (
        <div>
            <h3 style={titleStyle}>{title} ({date})</h3>
            <img src={url} alt={title} style={{ width: '100%', maxHeight: '700px', objectFit: 'cover' }} />
            <p>{explanation}</p>
        </div>
    );
};

export default ApodCard;
