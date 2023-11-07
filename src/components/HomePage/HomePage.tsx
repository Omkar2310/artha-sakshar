/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import TransactionList from '../TransactionList/TransactionList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TransactionModel } from '../../model/transaction';
import { useEffect, useState } from 'react';
import Transaction from '../Transaction/Transaction';
import LineChart from '../Analyze/LineChart';

export default function HomePage() {
    const statement = useSelector((state: any) => state.statement);
    const [, updateLocalStorageValue] = useLocalStorage<TransactionModel[]>('transact', statement);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    // console.log("Statement is " + JSON.stringify(statement));
    // const x = [{ "amount": -32000, "date": "3/10/2023, 3:02:01 pm", "description": "EMIs", "classification": "Need", "type": "Expense" }, { "amount": -32000, "date": "3/10/2023, 3:02:15 pm", "description": "Gym", "classification": "Want", "type": "Expense" }, { "amount": -7000, "date": "3/10/2023, 3:25:18 pm", "description": "MF", "classification": "Save", "type": "Expense" }, { "amount": -2500, "date": "3/10/2023, 3:25:31 pm", "description": "Electricity", "classification": "Need", "type": "Expense" }]
    // statement = [...statement, ...x];

    useEffect(() => {
        const income = statement.reduce((total: number, transact: TransactionModel) => {
            return transact.type === "Income" ? total + transact.amount : total
        }, 0)
        const expense = statement.reduce((total: number, transact: TransactionModel) => {
            return transact.type === "Expense" ? total + transact.amount : total
        }, 0)
        setTotalIncome(income);
        setTotalExpense(expense);
        updateLocalStorageValue(statement);
    }, [statement, updateLocalStorageValue])

    return (
        <div className='flex flex-col bg-gray-800'>
            <Transaction />
            <div className='flex flex-row justify-around content-center'>
                <div className='self-center'>
                    <LineChart />
                </div>
                <div className='w-1/2 p-5'>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Recent Transaction History</h2>
                    <TransactionList transactions={statement} filter={true} />
                    {/* <LineChart/> */}
                </div>
                <div className='self-center'>
                    <p>Total Income : ₹ {totalIncome}</p>
                    <p>Total Expense : ₹ {totalExpense}</p>
                </div>
            </div>
        </div>
    )
}
