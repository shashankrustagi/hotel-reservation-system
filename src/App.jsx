import React, { useState, useEffect } from 'react';
import HotelGrid from './HotelGrid';
import BookingInterface from './BookingInterface';
import './App.css';

function App() {
  const [bookedRooms, setBookedRooms] = useState(new Set());
  const [totalRooms] = useState(() => {
    const rooms = [];
    for (let floor = 1; floor <= 10; floor++) {
      const maxRooms = floor === 9 ? 7 : floor === 10 ? 3 : 10;
      for (let room = 1; room <= maxRooms; room++) {
        const roomNum = floor === 10 ? 1000 + room : floor * 100 + room;
        rooms.push(roomNum);
      }
    }
    return rooms;
  });

  // Helper functions (same as before)
  const getFloor = (room) => room >= 1000 ? 10 : Math.floor(room / 100);
  const getPosition = (room) => room % 100;
  const travelTime = (room1, room2) => {
    const f1 = getFloor(room1);
    const p1 = getPosition(room1);
    const f2 = getFloor(room2);
    const p2 = getPosition(room2);
    return f1 === f2 ? Math.abs(p1 - p2) : p1 + 2 * Math.abs(f1 - f2) + p2;
  };
  const maxTravelTime = (rooms) => {
    let maxTime = 0;
    for (let i = 0; i < rooms.length; i++) {
      for (let j = i + 1; j < rooms.length; j++) {
        maxTime = Math.max(maxTime, travelTime(rooms[i], rooms[j]));
      }
    }
    return maxTime;
  };
  const getAvailableRooms = () => totalRooms.filter(room => !bookedRooms.has(room));
  const getAvailableRoomsPerFloor = () => {
    const available = Array(11).fill().map(() => []);
    getAvailableRooms().forEach(room => {
      available[getFloor(room)].push(room);
    });
    return available;
  };

  // Booking logic
  const bookRooms = (k) => {
    if (k < 1 || k > 5) {
      alert('Please enter a number between 1 and 5.');
      return;
    }

    const availablePerFloor = getAvailableRoomsPerFloor();
    const candidates = [];

    // Single floor booking
    for (let f = 1; f <= 10; f++) {
      if (availablePerFloor[f].length >= k) {
        const positions = availablePerFloor[f].map(getPosition).sort((a, b) => a - b);
        let minSpan = Infinity;
        let startIdx = 0;
        for (let i = 0; i <= positions.length - k; i++) {
          const span = positions[i + k - 1] - positions[i];
          if (span < minSpan) {
            minSpan = span;
            startIdx = i;
          }
        }
        const selectedRooms = availablePerFloor[f].slice(startIdx, startIdx + k);
        candidates.push({
          rooms: selectedRooms,
          maxTime: minSpan
        });
      }
    }

    // Two adjacent floors booking
    for (let f = 1; f <= 9; f++) {
      for (let m = 1; m < k; m++) {
        if (availablePerFloor[f].length >= m && availablePerFloor[f + 1].length >= k - m) {
          const roomsF = availablePerFloor[f].sort((a, b) => getPosition(a) - getPosition(b)).slice(0, m);
          const roomsF1 = availablePerFloor[f + 1].sort((a, b) => getPosition(a) - getPosition(b)).slice(0, k - m);
          const selectedRooms = [...roomsF, ...roomsF1];
          candidates.push({
            rooms: selectedRooms,
            maxTime: maxTravelTime(selectedRooms)
          });
        }
      }
    }

    if (candidates.length === 0) {
      alert('Not enough available rooms to book.');
      return;
    }

    // Select best configuration
    candidates.sort((a, b) => a.maxTime - b.maxTime || Math.min(...a.rooms) - Math.min(...b.rooms));
    const best = candidates[0];
    const newBookedRooms = new Set(bookedRooms);
    best.rooms.forEach(room => newBookedRooms.add(room));
    setBookedRooms(newBookedRooms);
  };

  const generateRandomOccupancy = () => {
    const newBookedRooms = new Set();
    totalRooms.forEach(room => {
      if (Math.random() < 0.2) newBookedRooms.add(room);
    });
    setBookedRooms(newBookedRooms);
  };

  const resetBooking = () => {
    setBookedRooms(new Set());
  };

  return (
    <div className="App">
      <h1>Hotel Room Reservation System</h1>
      <BookingInterface 
        onBook={bookRooms} 
        onRandom={generateRandomOccupancy} 
        onReset={resetBooking} 
      />
      <HotelGrid rooms={totalRooms} bookedRooms={bookedRooms} />
    </div>
  );
}

export default App;