import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './TransactionsTable';
import Search from './Search';
import Statistics from './Statistics';
import BarChart from './BarChart';
import Pagination from './Pagination';

const App = () => {
    const [month, setMonth] = useState('March');
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTransactions();
        fetchStatistics();
    }, [month, searchTerm, page]);

    const fetchTransactions = async () => {
        const response = await axios.get('/api/transactions', {
            params: {
                month,
                searchTerm,
                page,
            },
        });
        setTransactions(response.data.transactions);
    };

    const fetchStatistics = async () => {
        const response = await axios.get('/api/statistics', {
            params: { month },
        });
        setStatistics(response.data);
    };

    return (
        <div>
            <h1>Transactions Dashboard</h1>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Statistics statistics={statistics} />
            <TransactionsTable transactions={transactions} />
            <Pagination page={page} setPage={setPage} />
            <BarChart month={month} />
        </div>
    );
};

export default App;
