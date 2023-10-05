export interface Transaction {
    date:               string,
    type:               'Income' | 'Expense',
    description:        string,
    amount:             number
}