import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import { UserContext } from './contexts/UserContext';
import axios from './utils/axios';
import Loader from './utils/Loader/Loader';
import IconPerks from './utils/PerksIcon';

function SinglePlacePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [review, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axios
      .get(`/place/${id}`)
      .then(({ data }) => {
        setPlace(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch place data. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mt-24 mx-10 py-8 bg-gray-100 text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="mt-24 mx-10 py-8 bg-gray-100 text-center">
        <p className="text-gray-600 text-lg">No place data available.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 lg:mt-20 ">
      <div className="bg-gray-200 mx-1 lg:mx-10 py-8 px-1 lg:px-4 rounded-xl">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink place={place} />
        <PlaceGallery place={place} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-">
          <div className="md:col-span-2">
            <div className="mb-2">
              <h2 className="font-semibold text-2xl mb-2">Description</h2>
              {place.description}
            </div>
            Check-in:&nbsp; {place.checkIn}
            <br />
            Check-out:&nbsp;{place.checkOut}
            <br />
            Max number of guests:&nbsp; {place.maxGuests}
          </div>
          {user?.role === 0 && (
            <div className=" mt-2 ">
              <BookingWidget place={place} />
            </div>
          )}
        </div>
      </div>
      {place.extraInfo.length > 100 && (
        <div className="bg-white mx-1 lg:mx-10 py-8 px-1 lg:px-4 border-t">
          <div>
            <h2 className="font-semibold text-2xl mb-2">Extra Info</h2>
          </div>

          <div className="mb-4 mt-1 text-sm text-gray-800 leading-5 pr-2">
            {place.extraInfo}
          </div>
        </div>
      )}
      {place.perks.length > 0 && (
        <div className="bg-gray-200  mx-1 lg:mx-10 py-8 px-1 lg:px-4">
          <h2 className="text-xl font-semibold mt-3">
            What this place offers:
          </h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
            {place.perks.length > 0 &&
              place.perks.map((perk) => (
                <div key={perk}>
                  <h3>{perk.toUpperCase()}</h3>
                  <IconPerks key={perk} val={perk} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePlacePage;
