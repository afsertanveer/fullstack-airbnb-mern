import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../pages/utils/axios';
import Perks from '../pages/utils/Perks';
import PhotoUploader from './PhotoUploader';

function PlacesFormPage() {
  const { id } = useParams();
  // console.log(id);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotoes, setAddedPhotoes] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();

  // console.log(import.meta.env.VITE_API_URL);

  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 ">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(e) {
    e.preventDefault();
    await axios
      .post('/upload-by-link', { link: photoLink })
      .then(({ data }) => {
        console.log(data);
        setAddedPhotoes((prev) => {
          return [...prev, data.secure_url];
        });
        setPhotoLink('');
      });
  }
  const uploadPhoto = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    // console.log(files);
    const urls = addedPhotoes;

    for (const file of files) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_CLOUND_UPLOAD_API}`,
          {
            method: 'POST',
            body: formData,
          },
        );
        const data = await response.json();
        console.log(data);
        urls.push(data.secure_url);
        setAddedPhotoes(urls);
        setIsLoading(false);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  const addNewPlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotoes,
      extraInfo,
      description,
      perks,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios
        .put('/places/' + id, placeData)
        .then(({ data }) => {
          toast('Successfully added a Place');
          console.log(data);
          navigate('/account/places');
        })
        .catch((e) => console.log(e));
    } else {
      await axios
        .post('/places', placeData)
        .then(({ data }) => {
          toast('Successfully added a Place');
          console.log(data);
          navigate('/account/places');
        })
        .catch((e) => console.log(e));
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      axios.get('/place/' + id).then(({ data }) => {
        console.log(data);
        setTitle(data.title || ''); // Fallback to empty string
        setAddress(data.address || '');
        setDescription(data.description || '');
        setExtraInfo(data.extraInfo || '');
        setPerks(data.perks || []);
        setAddedPhotoes(data.photos || []);
        setCheckIn(data.checkIn || '');
        setCheckOut(data.checkOut || '');
        setMaxGuests(data.maxGuests || 1);
      });
    } else {
      return;
    }
  }, [id]);
  return (
    <div>
      <form onSubmit={addNewPlace}>
        {preInput(
          'Title',
          'title for your place. Should be short/catchy for advertisement',
        )}
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My Lovely Apartment"
        />
        {preInput('Address', 'Address to your place!')}
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        {preInput('Photos', 'Attractive and more in number')}
        <PhotoUploader
          isLoading={isLoading}
          photoLink={photoLink}
          setPhotoLink={setPhotoLink}
          addPhotoByLink={addPhotoByLink}
          addedPhotoes={addedPhotoes}
          setAddedPhotoes={setAddedPhotoes}
          uploadPhoto={uploadPhoto}
        />
        {preInput('Description', 'Description of the place')}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput('Perks', 'Select all the perks of your place')}
        <div className="">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra Info', 'Instructions, specifications')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          'Check in & out times, max guest',
          'Check in and check out times , remember to have some time window for cleaning and setting up',
        )}
        <div className="grid sm:grid-cols-3">
          <div className="-mb-1 mt-2">
            <h3>Check in Time</h3>
            <input
              type="text"
              name="checkin"
              id="checkin"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="-mb-1 mt-2">
            <h3>Check out Time</h3>
            <input
              type="text"
              name="checkout"
              id="checkout"
              placeholder="14:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="-mb-1 mt-2">
            <h3>Maximum Guests</h3>
            <input
              type="number"
              name="max_guest"
              id="max_guest"
              placeholder="eg:2"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <div className="-mb-1 mt-2">
          <h3>Price(per night)</h3>
          <input
            type="number"
            name="price_per_night"
            id="price_per_night"
            placeholder="eg:2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-primary w-full text-center rounded-lg text-white py-2 font-bold text-xl my-4"
          value={id ? 'Update' : 'Save'}
        />
      </form>
    </div>
  );
}

export default PlacesFormPage;
