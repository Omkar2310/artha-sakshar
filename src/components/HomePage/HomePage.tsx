/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import TransactionList from '../TransactionList/TransactionList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TransactionModel } from '../../model/transaction';
import { useEffect } from 'react';

export default function HomePage() {
    const statement = useSelector((state: any) => state.statement);
    const [, updateLocalStorageValue] = useLocalStorage<TransactionModel[]>('transact', statement);
    console.log("Statement is " + JSON.stringify(statement));

    useEffect(() => {
        updateLocalStorageValue(statement);
    }, [statement, updateLocalStorageValue])

    return (
        <div className='bg-slate-600 w-full'>
            <TransactionList transactions={statement} />
        </div>
    )
}
