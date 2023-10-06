import React from 'react';
import { TransactionModel } from '../../model/transaction';
import Transaction from '../Transaction/Transaction';

interface TransactionListProps {
  transactions: TransactionModel[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className='flex flex-col items-center'>
      <Transaction />
      <div className="bg-transparent border-hidden p-4 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <ul className='overflow-y-hidden divide-y divide-gray-400'>
          {transactions.map((transaction: TransactionModel) => (
            <li key={transaction.date} className={`py-2 rounded-lg shadow-xl px-2 mb-2 bg-${transaction.type !== "Income" ? 'red-500' : 'green-500'}`}>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">{transaction.description}</p>
                  <p className="text-gray-600">{transaction.date}</p>
                </div>
                <div>
                  <p className={`text-${transaction.type !== "Income" ? 'red' : 'green'}-800 font-bold`}>
                    {transaction.type !== "Income" ? '-' : '+'}₹ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
