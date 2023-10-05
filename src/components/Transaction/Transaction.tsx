import { useState } from 'react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Transaction() {
    const [transactionType, setTransactionType] = useState<string>('Income');
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const handleAdd = () => {
        console.log('Data captured us');
        console.log(transactionType);
        console.log(amount);
        console.log(description);
    }
    return (
        <div className="w-2/3 px-20 flex flex-row m-2 justify-around">
            <div className='mt-auto'>
                {/* <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                    Type
                </label> */}
                <select onChange={(e) => { e.preventDefault(); setTransactionType(e.target.value) }} className={transactionType === "Income" ?
                    classNames("bg-green-500", "p-2.5 border rounded-md appearance-none") :
                    classNames("bg-red-500", "p-2.5 border rounded-md appearance-none")
                }>
                    <option selected className='bg-green-500 hover:bg-green-500' value="Income">Income</option>
                    <option className='bg-red-500 hover:bg-red-500' value="Expense">Expense</option>
                </select>
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                        type="text"
                        required
                        pattern='^([1-9]+[0-9]* | [1-9])$'
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        onChange={(e) => { e.preventDefault(); setAmount(parseInt(e.target.value)) }}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
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
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Description"
                        onChange={(e) => { e.preventDefault(); setDescription(e.target.value) }}
                    />
                </div>
            </div>

            <button className="h-10 mt-5 align-bottom bg-green-500 hover:bg-green-700 text-black font-medium py-2 px-4 rounded" onClick={handleAdd}>
                Add
            </button>
        </div>
    )
}
