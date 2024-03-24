'use client';

import { Chart as ChartJS, BarElement, CategoryScale,LinearScale,Tooltip,Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale,LinearScale, Tooltip, Legend);


interface  BarGraphProps{
    data : GraphData[]
}

type GraphData = {
    day : string;
    date : string;
    totalAmount: number;
}

const BarGraph : React.FC<BarGraphProps>  = ({data}) => {

    const labels = data.map((item) => item.day)
    const amounts = data.map((item) => item.totalAmount)

    const chartData ={
        labels : labels,
        datasets : [
            {
                label : 'Sale Amount',
                data : amounts,
                backgroundColor : 'rgba(75,192,75,0.6)',
                borderColor : 'rgba(75,192,75,1)',
                borderWidth : 2
            }
        ]
    }

    const options  = {
        scales : {
            y : {
                beginAtZero : true,
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 20,
                        weight : 'bold'
                    }
                }
            }
        }
    }

    return(
        <Bar className="mx-auto mb-5 w-[1000px]" data={chartData} options={options}>
            
        </Bar>
    )
}

export default BarGraph;