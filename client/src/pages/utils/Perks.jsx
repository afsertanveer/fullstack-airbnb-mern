import React from 'react';
import IconPerks from './PerksIcon';

function Perks({ selected, onChange }) {
  const handleCbClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
        <input
          onChange={(e) => handleCbClick(e)}
          type="checkbox"
          name="wifi"
          checked={selected.includes('wifi')}
          id="wifi"
        />
        <IconPerks val={'wifi'} />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
        <input
          onChange={(e) => handleCbClick(e)}
          type="checkbox"
          name="parking"
          checked={selected.includes('parking')}
          id="parking"
        />
        <IconPerks val={'parking'} />
        <span>Free Parking Spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
        <input
          onChange={(e) => handleCbClick(e)}
          type="checkbox"
          name="tv"
          checked={selected.includes('tv')}
          id="tv"
        />
        <IconPerks val={'tv'} />
        <span>Tv</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
        <input
          onChange={(e) => handleCbClick(e)}
          type="checkbox"
          name="radio"
          checked={selected.includes('radio')}
          id="radio"
        />
        <IconPerks val={'radio'} />
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
        <input
          onChange={(e) => handleCbClick(e)}
          type="checkbox"
          name="pets"
          checked={selected.includes('pets')}
          id="pets"
        />
        <IconPerks val={'pets'} />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
        <input
          onChange={(e) => handleCbClick(e)}
          type="checkbox"
          name="entrance"
          checked={selected.includes('entrance')}
          id="entrance"
        />
        <IconPerks val={'entrance'} />
        <span>Entrance</span>
      </label>
    </div>
  );
}

export default Perks;
