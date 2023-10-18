/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { TransactionModel } from "../../model/transaction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analyze() {
  const statement: TransactionModel[] = useSelector((state: any) => state.statement);
  const [groupChartData, setGroupChartData] = useState<number[]>();
  const [income, setIncome] = useState(0);

  const chartData = {
    datasets: [{
      data: groupChartData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'grey',
        'green'
      ]
    }],
    labels: [
      "Needs",
      "Wants",
      "Saving"
    ],
  };

  const plugins: Plugin<"doughnut", any>[] = [{
    id: '',
    beforeDraw: function (chart: any) {
      const width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.fillStyle = "white";
      ctx.textBaseline = "top";
      const text = `${income}`,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }]

  useEffect(() => {
    const chartingData = [];
    const totalIncome = statement.filter(trans => trans.classification === "Income").reduce((s, tx) => s += tx.amount, 0);
    chartingData.push(Math.abs(statement.filter(transaction => transaction.classification.toLowerCase() === "need").reduce((sum, tx) => sum += tx.amount, 0)));
    chartingData.push(Math.abs(statement.filter(transaction => transaction.classification.toLowerCase() === "want").reduce((sum, tx) => sum += tx.amount, 0)));
    chartingData.push(Math.abs(statement.filter(transaction => transaction.classification.toLowerCase() === "save").reduce((sum, tx) => sum += tx.amount, 0)));
    console.log(chartingData);
    setIncome(totalIncome);
    setGroupChartData(chartingData);
  }, [statement])

  return (
    <div className="flex justify-center">
      {groupChartData && groupChartData.length ?
        <Doughnut className="h-2/3 w-2/3" data={chartData} plugins={plugins}
          options={{
            color: 'white', resizeDelay: 2, borderColor: 'white', maintainAspectRatio: false
          }}
        />
        : <p>Loading...</p>
      }
    </div>
  )
}
