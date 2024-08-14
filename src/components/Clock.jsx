import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setTime(new Date());

    const timerId = setInterval(updateTime, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <p className="text-center text-capitalize fs-3">Hora Actual</p>
      <p className="text-center fs-4 fst-italic fw-bold">{formatTime(time)}</p>
    </div>
  );
};

export default Clock;
