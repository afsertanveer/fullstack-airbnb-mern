import React, { useEffect, useState } from 'react';
import BookingDates from '../components/BookingDates';
import Carousel from '../components/Curosel';
import axios from './utils/axios';
import Loader from './utils/Loader/Loader';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('/bookings');
        setBookings(data);
      } catch (err) {
        setError('Failed to load bookings.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Booking Page</h1>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
              >
                <div className="w-48 h-32">
                  {booking.place?.photos?.length > 0 ? (
                    <Carousel photos={booking.place.photos} />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-300">
                      <span>No photos available</span>
                    </div>
                  )}
                </div>
                <BookingDates booking={booking} />
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
