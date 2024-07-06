import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            const response = await axios.get('/api/chartData', { params: { month } });
            setChartData(response.data);
        };

        fetchChartData();
    }, [month]);

    return (
        <Bar
            data={{
                labels: chartData.labels,
                datasets: [
                    {
                        label: '# of Items',
                        data: chartData.data,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            }}
        />
    );
};

export default BarChart;
