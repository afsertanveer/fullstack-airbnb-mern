import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';
import axios from './utils/axios';
import Loader from './utils/Loader/Loader';

function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      setError(null); // Reset error on every fetch
      try {
        const { data } = await axios.get(`/booking/${id}`);
        setBooking(data);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="my-8">
      {booking ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {booking.place?.title || 'Untitled Place'}
          </h1>
          <AddressLink place={booking.place} />
          <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">
              Your Booking Information:
            </h2>
            <BookingDates booking={booking} />
          </div>
          <PlaceGallery place={booking.place} />
        </>
      ) : (
        <div className="text-center text-gray-500">
          No booking details available.
        </div>
      )}
    </div>
  );
}

export default BookingPage;
