import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSteps, setSortingSteps] = useState([]);

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 400) + 10);
    }
    setArray(newArray);
    setComparingIndices([]);
    setSortedIndices([]);
    setCurrentStep(0);
    setSortingSteps([]);
  }, [arraySize]);

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Sleep function for animation delay
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Bubble Sort Algorithm
  const bubbleSort = async (arr) => {
    const steps = [];
    const n = arr.length;
    const tempArray = [...arr];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...tempArray],
          comparing: [j, j + 1],
          sorted: []
        });

        if (tempArray[j] > tempArray[j + 1]) {
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
          steps.push({
            array: [...tempArray],
            comparing: [j, j + 1],
            sorted: []
          });
        }
      }
      steps.push({
        array: [...tempArray],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx)
      });
    }

    steps.push({
      array: [...tempArray],
      comparing: [],
      sorted: Array.from({ length: n }, (_, idx) => idx)
    });

    return steps;
  };

  // Insertion Sort Algorithm
  const insertionSort = async (arr) => {
    const steps = [];
    const n = arr.length;
    const tempArray = [...arr];

    steps.push({
      array: [...tempArray],
      comparing: [],
      sorted: [0]
    });

    for (let i = 1; i < n; i++) {
      let key = tempArray[i];
      let j = i - 1;

      steps.push({
        array: [...tempArray],
        comparing: [i],
        sorted: Array.from({ length: i }, (_, idx) => idx)
      });

      while (j >= 0 && tempArray[j] > key) {
        steps.push({
          array: [...tempArray],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => idx)
        });

        tempArray[j + 1] = tempArray[j];
        j = j - 1;

        steps.push({
          array: [...tempArray],
          comparing: [j + 1, j + 2],
          sorted: Array.from({ length: i }, (_, idx) => idx)
        });
      }
      tempArray[j + 1] = key;

      steps.push({
        array: [...tempArray],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx)
      });
    }

    return steps;
  };

  // Selection Sort Algorithm
  const selectionSort = async (arr) => {
    const steps = [];
    const n = arr.length;
    const tempArray = [...arr];

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...tempArray],
          comparing: [minIdx, j],
          sorted: Array.from({ length: i }, (_, idx) => idx)
        });

        if (tempArray[j] < tempArray[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [tempArray[i], tempArray[minIdx]] = [tempArray[minIdx], tempArray[i]];
      }

      steps.push({
        array: [...tempArray],
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx)
      });
    }

    steps.push({
      array: [...tempArray],
      comparing: [],
      sorted: Array.from({ length: n }, (_, idx) => idx)
    });

    return steps;
  };

  // Start sorting animation
  const startSorting = async () => {
    if (isSorting || array.length === 0) return;

    setIsSorting(true);
    setIsPaused(false);
    setSortedIndices([]);
    setComparingIndices([]);

    let steps = [];
    switch (algorithm) {
      case 'bubble':
        steps = await bubbleSort(array);
        break;
      case 'insertion':
        steps = await insertionSort(array);
        break;
      case 'selection':
        steps = await selectionSort(array);
        break;
      default:
        steps = await bubbleSort(array);
    }

    setSortingSteps(steps);
    
    for (let i = 0; i < steps.length; i++) {
      if (isPaused) break;
      
      setCurrentStep(i);
      setArray(steps[i].array);
      setComparingIndices(steps[i].comparing);
      setSortedIndices(steps[i].sorted);
      
      await sleep(101 - speed);
    }

    setIsSorting(false);
    setComparingIndices([]);
  };

  // Pause/Resume sorting
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Reset array and sorting state
  const resetArray = () => {
    setIsSorting(false);
    setIsPaused(false);
    generateArray();
  };

  // Get bar color based on state
  const getBarColor = (index) => {
    if (sortedIndices.includes(index)) return 'bg-green-500';
    if (comparingIndices.includes(index)) return 'bg-red-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sorting Algorithm Visualizer
        </h1>
        
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Array Input */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Array Size:</label>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                disabled={isSorting}
                className="w-32"
              />
              <span className="text-sm text-gray-600 w-8">{arraySize}</span>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Speed:</label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-gray-600 w-8">{speed}%</span>
            </div>

            {/* Algorithm Selection */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Algorithm:</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={isSorting}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="selection">Selection Sort</option>
              </select>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2">
              <button
                onClick={startSorting}
                disabled={isSorting && !isPaused}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={16} />
                Start
              </button>

              <button
                onClick={togglePause}
                disabled={!isSorting}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pause size={16} />
                {isPaused ? 'Resume' : 'Pause'}
              </button>

              <button
                onClick={resetArray}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <RotateCcw size={16} />
                Reset
              </button>

              <button
                onClick={generateArray}
                disabled={isSorting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Shuffle size={16} />
                Generate New Array
              </button>
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-end justify-center min-h-96 gap-1 overflow-x-auto relative">
            {array.map((value, index) => {
              const barWidth = Math.max(800 / array.length - 2, 4);
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{ width: `${barWidth}px`, minWidth: '2px' }}
                >
                  {/* Number display on top */}
                  <div 
                    className="text-xs font-medium text-gray-700 mb-1 text-center"
                    style={{ 
                      fontSize: `${Math.min(barWidth / 3, 12)}px`,
                      lineHeight: '1'
                    }}
                  >
                    {value}
                  </div>
                  {/* Bar */}
                  <div
                    className={`transition-all duration-200 ${getBarColor(index)} rounded-t`}
                    style={{
                      height: `${value}px`,
                      width: '100%'
                    }}
                    title={`Index: ${index}, Value: ${value}`}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Sorted</span>
            </div>
          </div>
        </div>

        {/* Algorithm Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {algorithm === 'bubble' && 'Bubble Sort'}
            {algorithm === 'insertion' && 'Insertion Sort'}
            {algorithm === 'selection' && 'Selection Sort'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Time Complexity</h3>
              <p className="text-gray-600">
                {algorithm === 'bubble' && 'O(n²) average and worst case'}
                {algorithm === 'insertion' && 'O(n²) average and worst case, O(n) best case'}
                {algorithm === 'selection' && 'O(n²) in all cases'}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Space Complexity</h3>
              <p className="text-gray-600">O(1) - In-place sorting</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Stability</h3>
              <p className="text-gray-600">
                {algorithm === 'bubble' && 'Stable'}
                {algorithm === 'insertion' && 'Stable'}
                {algorithm === 'selection' && 'Unstable'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;