import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../pages/utils/axios';
import { differenceInCalendarDays } from './../../node_modules/date-fns/differenceInCalendarDays';

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }
  const bookThisPlace = async (e) => {
    e.preventDefault();

    try {
      const price = parseInt(numberOfDays) * place.price;
      const data = {
        place: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
      };

      const response = await axios.post('/booking', data);
      toast('Booking Successful');
      console.log(response.data);
      navigate(`/account/booking/${response.data._id}`);
    } catch (error) {
      console.error('Booking failed', error);
      toast.error('Booking failed. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <h2 className="text-2xl text-center my-2">
        Price: ${place.price} / per night
      </h2>
      <div className="border rounded-2xl mb-3 ">
        <div className="flex">
          <div className="mb-1  py-4 px-4 mt-3">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="mb-4  py-4 px-4 border-l">
            <label>Check in:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4  py-4 px-4 border-t ">
          <label>Number of Guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
      </div>
      {numberOfDays > 0 && (
        <>
          <div className="mb-4  py-4 px-4 border-t ">
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4  py-4 px-4 border-t ">
            <label>Your Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </>
      )}
      <button className="primary" onClick={(e) => bookThisPlace(e)}>
        Book this place
        {numberOfDays > 0 && (
          <>
            <span> &nbsp; ${numberOfDays * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default BookingWidget;
