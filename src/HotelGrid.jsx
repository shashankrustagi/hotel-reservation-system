import React from 'react';

function HotelGrid({ rooms, bookedRooms }) {
  const getFloor = (room) => room >= 1000 ? 10 : Math.floor(room / 100);
  const getPosition = (room) => room % 100;

  const renderFloor = (floor) => {
    const maxRooms = floor === 9 ? 7 : floor === 10 ? 3 : 10;
    return (
      <div key={floor} className="floor">
        <h3>Floor {floor}</h3>
        <div className="room-row">
          {Array.from({ length: maxRooms }, (_, i) => {
            const roomNum = floor === 10 ? 1000 + (i + 1) : floor * 100 + (i + 1);
            const isBooked = bookedRooms.has(roomNum);
            return (
              <div 
                key={roomNum} 
                className={`room ${isBooked ? 'booked' : 'available'}`}
              >
                {roomNum}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="hotel-grid">
      {Array.from({ length: 10 }, (_, i) => renderFloor(i + 1))}
    </div>
  );
}

export default HotelGrid;