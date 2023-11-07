/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { TransactionModel } from "../../model/transaction";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart() {
  const statement: TransactionModel[] = useSelector((state: any) => state.statement);
  const [groupChartData, setGroupChartData] = useState<number[]>([]);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const chartData = {
    datasets: [{
      label: "Expense Line Chart",
      data: groupChartData,
      fill: false,
      borderColor: "#FFFFFF",
    }],
    labels: months
  };


  useEffect(() => {
    let monthData: any = [];
    let expenseDataByMonth: any = [];
    statement.map(transaction => {
        // console.log(transaction.date.split(',')[0].split('/')[1]);
        const monthIndex = parseInt(transaction.date.split(',')[0].split('/')[1])-1;
        // console.log(monthIndex);
        if(!monthData.find((item:any) => item === months[monthIndex])) {
          monthData.push(months[monthIndex]);
        }
        if(transaction.type !== "Income")
        {
          expenseDataByMonth.push({amount: transaction.amount, month: monthIndex});
        }
      })
      let result: any = [];
      expenseDataByMonth.reduce((res: any, value: any) => {
          if (!res[value.month]) {
              res[value.month] = { month: value.month, amt: 0 };
              result.push(res[value.month])
          }
          res[value.month].amt += value.amount;
          return res;
      }, {});
      const currMonth = new Date().getMonth();
      const expensesData = new Array(currMonth).fill(0);
      result.map((res: any) => {
        expensesData[res.month] = Math.abs(res.amt);
      });
      console.log(expensesData);
      setGroupChartData(expensesData);
  }, [statement])

  return (
    <div className="flex justify-center bg-gray-800">
      {groupChartData && groupChartData.length ?
        <Line data={chartData}/>
        : <p>Loading...</p>
      }
    </div>
  )
}
