import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const BatchDetails = () => {
  const location = useLocation();
  const { batch, scoresData: initialScoresData } = location.state;
  const [scoresData, setScoresData] = useState(initialScoresData || []);
  const [filteredScoresData, setFilteredScoresData] = useState(initialScoresData || []);
  const [loading, setLoading] = useState(!initialScoresData); // Only set loading to true if no initial data
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All'); // Progress filter state
  const [topFilter, setTopFilter] = useState('None'); // Top score filter state
  const [avgFilter, setAvgFilter] = useState('None'); // Average filter state

  useEffect(() => {
    const fetchScores = async () => {
      if (!initialScoresData) {
        try {
          const response = await axios.get(`http://localhost:3000/api/getScores/${batch.batchId}`);
          setScoresData(response.data);
          setFilteredScoresData(response.data); // Set initial filtered data
          setLoading(false);
        } catch (err) {
          setError('Error fetching candidate scores');
          setLoading(false);
          toast.error('Error fetching candidate scores');
        }
      }
    };
    fetchScores();
  }, [batch.batchId, initialScoresData]);

  useEffect(() => {
    // Filter scoresData based on the selected filters
    let data = [...scoresData];
    
    // Apply top score filter
    if (topFilter === 'Top Test Score') {
      data = data.sort((a, b) => b.testScore - a.testScore).slice(0, 10); // Top 10 Test Scores
    } else if (topFilter === 'Top Interview Score') {
      data = data.sort((a, b) => b.interviewScore - a.interviewScore).slice(0, 10); // Top 10 Interview Scores
    }

    // Apply average filter
    if (avgFilter === 'Above Average') {
      const average = data.reduce((acc, score) => acc + ((score.testScore + score.interviewScore) / 2), 0) / data.length;
      data = data.filter(score => ((score.testScore + score.interviewScore) / 2) >= average);
    } else if (avgFilter === 'Below Average') {
      const average = data.reduce((acc, score) => acc + ((score.testScore + score.interviewScore) / 2), 0) / data.length;
      data = data.filter(score => ((score.testScore + score.interviewScore) / 2) < average);
    }

    // Apply progress filter
    if (filter === 'All') {
      setFilteredScoresData(data);
    } else {
      const isCompleted = filter === 'Completed';
      setFilteredScoresData(
        data.filter(score =>
          isCompleted ? score.testScore > 0 && score.interviewScore > 0 : score.testScore === 0 && score.interviewScore === 0
        )
      );
    }
  }, [filter, topFilter, avgFilter, scoresData]);

  // Helper function to calculate summary statistics
  const getSummaryStatistics = (data) => {
    if (data.length === 0) return { avgTestScore: 0, avgInterviewScore: 0, topTestScore: 0, topInterviewScore: 0, bottomTestScore: 0, bottomInterviewScore: 0 };

    const testScores = data.map(score => score.testScore);
    const interviewScores = data.map(score => score.interviewScore);

    const avgTestScore = testScores.reduce((a, b) => a + b, 0) / testScores.length;
    const avgInterviewScore = interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length;
    const topTestScore = Math.max(...testScores);
    const topInterviewScore = Math.max(...interviewScores);
    const bottomTestScore = Math.min(...testScores);
    const bottomInterviewScore = Math.min(...interviewScores);

    return { avgTestScore, avgInterviewScore, topTestScore, topInterviewScore, bottomTestScore, bottomInterviewScore };
  };

  const { avgTestScore, avgInterviewScore, topTestScore, topInterviewScore, bottomTestScore, bottomInterviewScore } = getSummaryStatistics(filteredScoresData);

  if (loading) {
    return <p>Loading Candidate Scores...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Prepare data for the Bar Chart
  const chartData = {
    labels: filteredScoresData.map(score => score.email),
    datasets: [
      {
        label: 'Test Score',
        data: filteredScoresData.map(score => score.testScore),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Interview Score',
        data: filteredScoresData.map(score => score.interviewScore),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Prepare data for the Pie Chart (Average Score Distribution)
  const averageScores = filteredScoresData.map(score => (score.testScore + score.interviewScore) / 2);

  // Define bins for average scores
  const bins = { '0-50': 0, '51-75': 0, '76-100': 0 };
  
  averageScores.forEach(score => {
    if (score <= 50) bins['0-50']++;
    else if (score <= 75) bins['51-75']++;
    else bins['76-100']++;
  });

  const pieData = {
    labels: Object.keys(bins),
    datasets: [
      {
        data: Object.values(bins),
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="px-4 lg:px-28 my-10 text-gray-700">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center my-8">
      {batch.companyName}   {batch.domains} Interview Batch Scores Details Recruitment 2024 
      </h2>
      <div className="my-4 flex gap-4">
        <div>
          <label htmlFor="filter" className="mr-2">Filter by Progress:</label>
          <select
            id="filter"
            className="p-2 border border-gray-300 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <div>
          <label htmlFor="topFilter" className="mr-2">Top Scores Filter:</label>
          <select
            id="topFilter"
            className="p-2 border border-gray-300 rounded"
            value={topFilter}
            onChange={(e) => setTopFilter(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Top Test Score">Top Test Score</option>
            <option value="Top Interview Score">Top Interview Score</option>
          </select>
        </div>
        <div>
          <label htmlFor="avgFilter" className="mr-2">Filter by Average Score:</label>
          <select
            id="avgFilter"
            className="p-2 border border-gray-300 rounded"
            value={avgFilter}
            onChange={(e) => setAvgFilter(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Above Average">Above Average</option>
            <option value="Below Average">Below Average</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border border-slate-300 mt-3">
        <table className="text-left w-full">
          <thead className="bg-slate-100 flex w-full border-b border-gray-300">
            <tr className="flex w-full">
              <th className="px-3 py-5 w-2/6">Email</th>
              <th className="px-3 py-5 w-1/6">Test Score</th>
              <th className="px-3 py-5 w-1/6">Interview Score</th>
              <th className="px-3 py-5 w-1/6">Progress</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-80 overflow-y-scroll w-full bg-slate-50">
          <table className="text-left w-full">
            <tbody className="bg-grey-light items-center justify-between w-full">
              {filteredScoresData.map((score, index) => (
                <tr key={index} className="flex w-full border-b border-gray-300 h-min">
                  <td className="px-3 py-5 w-2/6 break-words">{score.email}</td>
                  <td className="px-3 py-5 w-1/6">{score.testScore}</td>
                  <td className="px-3 py-5 w-1/6">{score.interviewScore}</td>
                  <td className="px-3 py-5 w-1/6">
                    <span
                      className={`${
                        score.testScore > 0 && score.interviewScore > 0 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      } px-2 py-1 rounded-full text-xs font-semibold`}
                    >
                      {score.testScore > 0 && score.interviewScore > 0 ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-8">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y;
                    }
                    return label;
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Email'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Score'
                },
                beginAtZero: true
              }
            }
          }}
        />
      </div>
     
      <div className="my-8">
        <h3 className="text-xl font-semibold">Interpretation</h3>
        <p><strong>Average Test Score:</strong> {avgTestScore.toFixed(2)}</p>
        <p><strong>Average Interview Score:</strong> {avgInterviewScore.toFixed(2)}</p>
        <p><strong>Top Test Score:</strong> {topTestScore}</p>
        <p><strong>Top Interview Score:</strong> {topInterviewScore}</p>
        <p><strong>Bottom Test Score:</strong> {bottomTestScore}</p>
        <p><strong>Bottom Interview Score:</strong> {bottomInterviewScore}</p>
      </div>
    </div>
  );
};

export default BatchDetails;
