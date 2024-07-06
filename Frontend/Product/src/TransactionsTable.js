import React from 'react';

const TransactionsTable = ({ transactions }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.title}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionsTable;
