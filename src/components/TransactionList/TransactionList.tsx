import React, { FormEvent } from 'react';
import { TransactionModel } from '../../model/transaction';
import Transaction from '../Transaction/Transaction';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../store/statement';

interface TransactionListProps {
  transactions: TransactionModel[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const dispatch = useDispatch();

  const handleDelete = (transaction: TransactionModel) => {
    dispatch(deleteTransaction(transaction));
  }
  
  return (
    <div className='flex flex-col items-center'>
      <Transaction />
      <div className="p-4 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <ul className='border-white rounded-2xl scroll-m-1'>
          {transactions.map((transaction: TransactionModel) => (
            <li key={transaction.date} className="rounded-2xl mb-2">
              <div className={`flex flex-row justify-between p-2 text-lg list font-semibold ${transaction.type !== "Income" ? 'border-2 border-red-500 text-cyan-100' : 'border-2 border-green-500 text-cyan-100'}`}>
                <p>{transaction.description}</p>
                <div className='flex flex-row space-x-2'>
                  <p>
                    ₹ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p onClick={() => handleDelete(transaction)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

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
