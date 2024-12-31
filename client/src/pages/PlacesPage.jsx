import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';
import PlacesFormPage from '../components/PlacesFormPage';
import axios from './utils/axios';
import Loader from './utils/Loader/Loader';

function PlacesPage() {
  const { action } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  // console.log(action);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/places').then(({ data }) => {
      // console.log(data);
      setPlaces(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="">
            {action !== 'new' ? (
              <>
                <div className="text-center">
                  <Link
                    className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-2 "
                    to={'/account/places/new'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Add New
                  </Link>

                  {isLoading && <Loader />}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg">
                  {!isLoading &&
                    places.length > 0 &&
                    places.map((place) => (
                      <div
                        key={place._id}
                        className="rounded-lg "
                        // onClick={() => goWithId(place._id)}
                      >
                        <PlaceCard place={place} />
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div>
                <PlacesFormPage />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PlacesPage;
