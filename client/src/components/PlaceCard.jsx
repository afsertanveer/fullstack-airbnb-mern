import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Carousel from './Curosel';

function PlaceCard({ place }) {
  const { title, photos, address, description, _id, price } = place;
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <div className="h-full border border-gray-200 px-4 rounded-xl py-4 placeCard flex flex-col justify-between">
      <div>
        <div className="relative">
          <Carousel photos={photos} />
          <div className="absolute top-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-400 text-sm">{address}</p>
          <p className="mt-4  text-gray-700">
            {description.length > 150
              ? description.slice(0, 150) + '.....'
              : description}
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <Link
          className="rounded-xl text-white px-2 py-1 bg-primary "
          to={`/account/place/${_id}`}
        >
          Details
        </Link>
        {pathname === '/' ? (
          <h2 className=" font-bold mr-1">${price}/night</h2>
        ) : (
          <Link
            className="rounded-xl text-white px-3 py-1 bg-red-500 "
            to={`/account/places/edit/${_id}`}
          >
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}

export default PlaceCard;
