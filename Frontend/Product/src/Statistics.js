import React from 'react';

const Statistics = ({ statistics }) => {
    return (
        <div>
            <div>Total Sales: {statistics.totalSales}</div>
            <div>Total Sold Items: {statistics.totalSoldItems}</div>
            <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
        </div>
    );
};

export default Statistics;
