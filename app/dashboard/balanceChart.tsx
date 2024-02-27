'use client'

import { useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import { useSearchParams } from "next/navigation";
import WalletChart from "./actions/chart";

interface IntfData {
  month: number,
  balance: number,
  income: number,
  expenditure: number,
  createdAt: Date,
  updatedAt: Date
}

function BalanceChart() {
  const searchParams = useSearchParams()
  const year = searchParams.get('year')

  const [data, setData] = useState<[IntfData]>([{
    month: 0,
    balance: 0,
    income: 0,
    expenditure: 0,
    createdAt: new Date,
    updatedAt: new Date
  }])

  const [chartData, setChartData] = useState({
    dataIncome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dataExpenditure: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dataBalance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respData:any = await WalletChart(year)
        setData(respData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [year]);

  useEffect(() => {
    if (data.length > 0) {
      setChartData(prevChartData => {
        const newChartData = { ...prevChartData };

        data.forEach(item => {
          newChartData.dataIncome[item.month] = item.income;
          newChartData.dataExpenditure[item.month] = item.expenditure;
          newChartData.dataBalance[item.month] = item.balance;
        });
        return newChartData;
      });
    } else {
      setChartData({
        dataIncome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataExpenditure: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataBalance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      })
    }

  }, [data]);

  useEffect(() => {
    var canvas = (document.getElementById('myChart') as HTMLCanvasElement);

    if (canvas) {
      var existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }

      var ctx = canvas.getContext('2d');

      if (ctx) {
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Nov", "Des"],
            datasets: [{
              data: chartData.dataIncome,
              label: "Pemasukan",
              borderColor: "rgb(109, 253, 181)",
              backgroundColor: "rgb(109, 253, 181,0.5)",
              borderWidth: 2
            }, {
              data: chartData.dataExpenditure,
              label: "Pengeluaran",
              borderColor: "rgb(255, 87, 51)",
              backgroundColor: "rgb(255, 87, 51,0.5)",
              borderWidth: 2
            }, {
              data: chartData.dataBalance,
              label: "Saldo",
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgb(255, 205, 86,0.5)",
              borderWidth: 2
            }]
          }
        });
      } else {
        console.error('Konteks canvas tidak ditemukan.');
      }
    } else {
      console.error('Elemen canvas tidak ditemukan.');
    }
  }, [chartData]);

  return (
    <>
      {/* Bar chart */}
      {/* <h1 className="w-[150px] mx-auto text-xl font-semibold capitalize ">Bar Chart</h1> */}
      <div className="h-screen flex mx-auto">
        <div className='border pt-0 rounded-xl w-full h-fit shadow-sm'>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  )
}

export default BalanceChart;