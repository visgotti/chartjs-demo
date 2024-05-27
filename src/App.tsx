import { useEffect, useMemo, useState } from 'react';
import './style.scss';
// needed for tslint
import "chart.js/auto";

import { Chart } from 'react-chartjs-2';

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import type { ChartType, IRootState, } from './store';
import {
  setData,
} from './store';
import { capitalizeFirstLetter, createChartData, generateRandomNumbers } from './utilts';
import { MONTH_LABELS } from './constants';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
    },
  },
};

function App() {
  const chartData = useSelector((state: IRootState) => state.chart);
  const [charts, setCharts] = useState<ChartType[]>(["bar", "line", "pie"]);
  const [chartIndex, setChartIndex] = useState(1);

  const handleGenerateData = useCallback((chart: ChartType) => {
    return () => {
      dispatch(setData({ 
        chart,
        data: generateRandomNumbers(MONTH_LABELS.length, 0, 10000),
      }));
    }
  }, []);

  useEffect(() => {
    charts.forEach(c => handleGenerateData(c)());
  }, []);

  
  const createOptions = useCallback((chartType: ChartType) => {
    return {
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          text: `${capitalizeFirstLetter(chartType)} Chart`,
        },
        tooltip: { 
          enabled: charts[chartIndex] === chartType,
        }
      }
    }
  }, [charts, chartIndex]);

  const lineData = useMemo(() => createChartData(chartData.line), [chartData.line]);
  const barData = useMemo(() => createChartData(chartData.bar), [chartData.bar]);
  const pieData = useMemo(() => createChartData(chartData.pie), [chartData.pie]);
  const dispatch = useDispatch();

  const chartOptions = useMemo(() => {
    return {
      bar: createOptions("bar"),
      line: createOptions("line"),
      pie: createOptions("pie"),
    }
  }, [createOptions]);

  const data = {
    pie: pieData,
    bar: barData,
    line: lineData,
  }

  return (
    <div className="container">
      <div className={`charts active-chart-${chartIndex}`}>
      {charts.map((chart, index) => (
          <div 
          onClick={() => setChartIndex(index)} 
          key={index} 
          className={`chart ${chartIndex === index ? 'active' : 'inactive' }`} 
          id={`chart-${index+1}`}>
            <div
              className='chart-inner'
            >
              <button onClick={handleGenerateData(chart)}> { `Generate Data` } </button>
              <div className='canvas-wrapper'>
                <Chart type={chart} options={chartOptions[chart]} data={data[chart]} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


