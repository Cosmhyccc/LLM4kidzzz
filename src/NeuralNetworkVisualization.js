import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Slider from './Slider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NeuralNetworkVisualization = () => {
  const [weight, setWeight] = useState(1);
  const [bias, setBias] = useState(0);
  const [data, setData] = useState([]);
  const [neuronSize, setNeuronSize] = useState(50);

  useEffect(() => {
    const newData = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const y = 1 / (1 + Math.exp(-(weight * x + bias)));
      newData.push({ x, y });
    }
    setData(newData);

    // Animate neuron size
    setNeuronSize(30 + Math.abs(weight) * 10);
  }, [weight, bias]);

  const chartData = {
    datasets: [
      {
        label: 'Neural Network Output',
        data: data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 500,
      easing: 'easeInOutQuad',
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Input',
          color: 'rgb(75, 192, 192)',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(75, 192, 192, 0.2)',
        },
      },
      y: {
        beginAtZero: true,
        max: 1,
        title: {
          display: true,
          text: 'Output',
          color: 'rgb(255, 99, 132)',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(255, 99, 132, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Brain Cell Explorer!</h1>
      <div className="flex items-center justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-yellow-300 flex items-center justify-center mr-4 transition-all duration-300 ease-in-out" style={{ width: `${neuronSize}px`, height: `${neuronSize}px` }}>
          <span className="text-2xl">🧠</span>
        </div>
        <div className="w-20 h-1 bg-indigo-400"></div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center ml-4">
          <span className="text-2xl">💡</span>
        </div>
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label className="block mb-2 text-lg font-semibold text-indigo-600">Brain Power: {weight.toFixed(2)}</label>
        <Slider
          min={-5}
          max={5}
          step={0.1}
          value={[weight]}
          onValueChange={(value) => setWeight(value[0])}
        />
      </div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label className="block mb-2 text-lg font-semibold text-indigo-600">Brain Mood: {bias.toFixed(2)}</label>
        <Slider
          min={-5}
          max={5}
          step={0.1}
          value={[bias]}
          onValueChange={(value) => setBias(value[0])}
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How It Works:</h2>
        <p className="mb-4">This is like a tiny brain cell (neuron) that learns and makes decisions!</p>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold text-indigo-600">Brain Power:</span> Makes the brain cell more sure about its decisions. Higher power means quicker decisions!</li>
          <li><span className="font-semibold text-indigo-600">Brain Mood:</span> Changes when the brain cell starts to make a decision. Like waking up early or sleeping in!</li>
        </ul>
        <p className="mt-4">Play with the sliders and watch how the brain cell's decisions change. The bouncy line shows you what it's thinking!</p>
      </div>
    </div>
  );
};

export default NeuralNetworkVisualization;