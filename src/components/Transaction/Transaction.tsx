import { FormEvent, useState } from 'react'
import { TransactionModel } from '../../model/transaction';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/statement';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Transaction() {

    const dispatch = useDispatch();

    const [, setTransaction] = useState<TransactionModel>();
    const [transactionType, setTransactionType] = useState<string>('Income');
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentTransaction: TransactionModel = {
            amount: parseInt(amount),
            date: new Date().toLocaleString(),
            description: description,
            type: transactionType
        };
        setTransaction(currentTransaction);
        dispatch(addTransaction(currentTransaction));
        setAmount("");
        setDescription("");
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)} className="w-2/3 px-20 flex flex-row m-2 justify-around">
            <div className='mt-auto'>
                <select onChange={(e) => { e.preventDefault(); setTransactionType(e.target.value) }} className={transactionType === "Income" ?
                    classNames("bg-green-500", "p-2.5 border rounded-md appearance-none") :
                    classNames("bg-red-500", "p-2.5 border rounded-md appearance-none")
                }>
                    <option className='bg-green-500 hover:bg-green-500' value="Income">Income</option>
                    <option className='bg-red-500 hover:bg-red-500' value="Expense">Expense</option>
                </select>
            </div>

            <div>
                <label className="block text-sm leading-6 text-white font-semibold">
                    Price
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                        type="text"
                        required
                        pattern='\d+'
                        name="price"
                        id="price"
                        value={amount}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        onChange={(e) => { e.preventDefault(); setAmount(e.target.value) }}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-white">
                    Description
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">💰</span>
                    </div>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={description}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="  Description"
                        onChange={(e) => { e.preventDefault(); setDescription(e.target.value) }}
                    />
                </div>
            </div>

            <button type='submit' className="h-10 mt-5 align-bottom bg-green-500 hover:bg-green-700 text-black font-medium py-2 px-4 rounded">
                Add
            </button>
        </form>
    );
}
