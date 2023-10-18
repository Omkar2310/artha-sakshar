import { FormEvent, useState } from 'react'
import { TransactionModel } from '../../model/transaction';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/statement';
import descriptionList from '../../utils/description';

export default function Transaction() {

    const dispatch = useDispatch();
    const [, setTransaction] = useState<TransactionModel>();
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>(descriptionList[0].descriptionText);
    const [classification, setClassification] = useState<string>(descriptionList[0].type);


    const handleDescription = (desc: string) => {
        const classify = descriptionList.filter(d => d.descriptionText === desc);
        if (classify) {
            setClassification(classify[0].type);
            setDescription(classify[0].descriptionText);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const classify = descriptionList.filter(d => d.descriptionText === description);
        if (classify) {
            setClassification(classify[0].type);
        }
        const currentTransaction: TransactionModel = {
            amount: parseInt(amount),
            date: new Date().toLocaleString(),
            description: description,
            classification: classification,
            type: parseInt(amount) > 0 ? "Income" : "Expense"
        };
        console.log(currentTransaction);
        setTransaction(currentTransaction);
        dispatch(addTransaction(currentTransaction));
        setAmount("");
        setDescription("");
        setClassification("");
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)} className="w-2/3 px-25 flex flex-row m-3 justify-around">
            <div>
                <label className="block text-sm leading-6 text-white font-semibold">
                    Price
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                        type="number"
                        required
                        pattern='\-d+'
                        name="price"
                        id="price"
                        value={amount}
                        className="block w-full text-white rounded-md border-0 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6"
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
                    <select onChange={(e) => { handleDescription(e.target.value) }} className="block w-full rounded-md text-white border-0 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6">
                        {descriptionList.map((d, index: number) => {
                            return <option key={index} value={d.descriptionText}>{d.descriptionText}</option>
                        })}
                    </select>
                </div>
            </div>

            <button type='submit' className="h-10 mt-5 align-bottom bg-green-500 hover:bg-green-700 text-black font-medium py-2 px-4 rounded">
                Add
            </button>
        </form>
    );
}
