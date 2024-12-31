import React from 'react';
import PlacesFormPage from '../components/PlacesFormPage';

function EditPlacePage() {
  return (
    <div className="mt-2 mb-10">
      <h1 className="text-center mt-10 text-4xl text-red-700 font-bold">
        Edit Place
      </h1>
      <PlacesFormPage />
    </div>
  );
}

export default EditPlacePage;
