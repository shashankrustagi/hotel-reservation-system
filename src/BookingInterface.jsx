import React, { useState } from 'react';

function BookingInterface({ onBook, onRandom, onReset }) {
  const [numRooms, setNumRooms] = useState(1);

  const handleBook = () => {
    onBook(numRooms);
  };

  return (
    <div className="booking-interface">
      <input 
        type="number" 
        value={numRooms} 
        onChange={(e) => setNumRooms(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))} 
        min="1" 
        max="5" 
        placeholder="No of Rooms"
      />
      <button onClick={handleBook}>Book</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onRandom}>Random</button>
    </div>
  );
}

export default BookingInterface;