import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';
// import { TRANSACTION } from './types'

const API_URL = 'http://localhost:3000/transactions'; // Change this to your API URL
const TRANSACTIONS_PER_PAGE = 5; // Change this to the desired number of transactions per page

function Summary({ filteredTransactions }) {
  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="summary">
      <h2>Summary</h2>
      <div>Total Transactions: {totalTransactions}</div>
      <div>Total Amount: {totalAmount} USD</div>
    </div>
  );
}

function App() {
  // eslint-disable-next-line no-mixed-operators
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date'); // Default sorting by date
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, sortBy, sortOrder, startDate, endDate]); // Refetch transactions when the current page, sorting criteria, or order changes

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      setTransactions(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching transactions');
    }
  };

  const sortTransactions = () => {
    const sortedTransactions = [...transactions];
    sortedTransactions.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = moment(a.date);
        const dateB = moment(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });
    return sortedTransactions;
  };

  const filteredAndSortedTransactions = () => {
    const sortedTransactions = sortTransactions();
    const filteredTransactions = sortedTransactions.filter(transaction => {
      const transactionDate = moment(transaction.date);
      if (startDate && endDate) {
        return transactionDate.isBetween(startDate, endDate);
      } else if (startDate) {
        return transactionDate.isSameOrAfter(startDate);
      } else if (endDate) {
        return transactionDate.isSameOrBefore(endDate);
      }
      return true;
    });

    // Calculate pagination
    const startIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
    const endIndex = startIndex + TRANSACTIONS_PER_PAGE;
    return filteredTransactions.slice(startIndex, endIndex);
  };

  const pageCount = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
  
  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="App">
      <h1>Payment Transactions</h1>
      {error && <div className="error">{error}</div>}
      <div className="filters">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select value={sortOrder} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <Summary filteredTransactions={filteredAndSortedTransactions()} />
      <ul className="transactions-list">
        {filteredAndSortedTransactions().map(transaction => (
          <li key={transaction.id} className="transaction-item">
            <div className="transaction-id">Transaction ID: {transaction.id}</div>
            <div>Date: {transaction.date}</div>
            <div>Description: {transaction.description}</div>
            <div>Amount: {transaction.amount} USD</div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from(Array(pageCount).keys()).map(page => (
          <button key={page + 1} onClick={() => changePage(page + 1)}>{page + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
