import React, { useEffect, useState } from 'react';
import PlaceCard from './../components/PlaceCard';
import axios from './utils/axios';

function IndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  // console.log(action);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/all-places').then(({ data }) => {
      // console.log(data);
      setPlaces(data);
      setIsLoading(false);
    });
  }, []);
  return (
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
  );
}

export default IndexPage;
