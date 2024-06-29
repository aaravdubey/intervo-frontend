import React from 'react'
import GaugeComponent from 'react-gauge-component'
import { MdBarChart } from "react-icons/md";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function TimeAnalysis({ correctAnswers, wrongAnswers }) {
    const data = {
        labels: ['Correct Answers', 'Wrong Answers'],
        datasets: [
          {
            label: 'Number of Answers',
            data: [correctAnswers, wrongAnswers],
            backgroundColor: ['#4caf50', '#f44336'],
            borderColor: ['#388e3c', '#d32f2f'],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Correct vs Wrong Answers',
          },
        },
      };
    return (
        <div className="bg-white p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4  flex  items-center">
            <div className=' rounded-md  bg-teal-blue'>
          <MdBarChart size={34}/>
          </div>
          <div className='pl-3'>
            Time Analysis
            </div>
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Average Time Spent</h3>
              <div className="h-5/6 bg-cyan-200 mt-3  w-2/3">
              <Bar data={data} options={options} />
              </div>
              <p className="text-xs text-gray-500 mt-2">The time spent details are shown in seconds.</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Average Speed</h3>
              <GaugeComponent
  type="semicircle"
  arc={{
    width: 0.2,
    padding: 0.005,
    cornerRadius: 1,
    // gradient: true,
    subArcs: [
      {
        limit: 15,
        color: '#EA4228',
        showTick: true,
        tooltip: {
          text: 'Very Slow'
        },
        onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
        onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
        onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
      },
      {
        limit: 17,
        color: '#F5CD19',
        showTick: true,
        tooltip: {
          text: 'Slow'
        }
      },
      {
        limit: 28,
        color: '#5BE12C',
        showTick: true,
        tooltip: {
          text: 'Moderate'
        }
      },
      {
        limit: 30, color: '#F5CD19', showTick: true,
        tooltip: {
          text: 'Fast'
        }
      },
      {
        color: '#EA4228',
        tooltip: {
          text: 'Very Fast'
        }
      }
    ]
  }}
  pointer={{
    color: '#345243',
    length: 0.80,
    width: 15,
    // elastic: true,
  }}
  labels={{
    valueLabel: { formatTextValue: value => value + 'ºC' },
    tickLabels: {
      type: 'outer',
      valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
      ticks: [
        { value: 13 },
        { value: 22.5 },
        { value: 32 }
      ],
    }
  }}
  value={22.5}
  minValue={10}
  maxValue={35}
/>
              <p className="text-xs text-gray-500 mt-2">Average speed measured by the total time taken to score. Based on the assumption that the time allotted to complete the test is for an average ranked candidate.</p>
            </div>
          </div>
        </div>
      );
    };
    
