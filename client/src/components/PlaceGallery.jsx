import React, { useState } from 'react';

function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  // const {user} =
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  min-h-screen ">
        <div className="bg-black p-8 grid gap-4 mx-4 lg:mx-16 ">
          <div>
            <h2 className="text-3xl text-white">Photos of {place.title}</h2>
            <button
              className="flex fixed top-0 right-1 lg:right-6 lg:top-8 gap-1 py-2 px-4 rounded-2xl bg-white shadow shadow-black"
              onClick={() => setShowAllPhotos(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 lg:size-10"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img className="w-full" src={`${photo || 'default.jpg'}`} />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-4 rounded-3xl overflow-hidden">
        <div className="col-span-3">
          <div className=" w-full h-full">
            <img
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
              src={`${place?.photos?.[0] || 'default.jpg'}`}
              alt={place.title}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <img
            className="object-cover w-full h-full cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
            src={`${place?.photos?.[1] || 'default.jpg'}`}
            alt={`${place.title} photo ${1 + 1}`}
          />
          <div className="overflow-hidden">
            <img
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
              src={`${place?.photos?.[2] || 'default.jpg'}`}
              alt={`${place.title} `}
            />
          </div>
        </div>
      </div>
      <button
        className="absolute flex gap-1 bottom-2 right-2 py-1 px-2 bg-white rounded-2xl shadow shadow-gray-500"
        onClick={() => setShowAllPhotos(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
        Show More
      </button>
    </div>
  );
}

export default PlaceGallery;
