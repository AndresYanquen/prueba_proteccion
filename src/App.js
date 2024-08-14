import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateFibonacci } from './features/fibonacciSlice';
import Clock from './components/Clock';
import { isValidTimeFormat } from './utils/common';

function App() {
  const [inputTime, setInputTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const fibonacciSeries = useSelector((state) => state.fibonacci.series);
  const serverTime = useSelector((state) => state.fibonacci.serverTime);

  const handleGenerateFibonacci = () => {
    if (inputTime === '') {
      setErrorMessage('');
      dispatch(generateFibonacci(inputTime));
      return;
    }

    const isValidDate = isValidTimeFormat(inputTime);

    if (isValidDate) {
      setErrorMessage('');
      dispatch(generateFibonacci(inputTime));
    } else {
      setErrorMessage('Formato inválido por favor usa este formato: HH:MM:SS');
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h2>Generador de Serie Fibonacci</h2>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
        <Clock/>
          <label htmlFor="inputTime" className="form-label">Ingrese la hora exacta (HH:mm:ss)</label>
          <input
            type="text"
            id="inputTime"
            className="form-control"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
          />
           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        <div className="col-12">
          
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <h5>Hora del servidor: {serverTime}</h5>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <button className="btn btn-primary" onClick={handleGenerateFibonacci}>
            Generar Serie Fibonacci
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h5>Resultados:</h5>
          <p>{fibonacciSeries.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
