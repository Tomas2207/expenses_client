import React from 'react';
import add from '../assets/add.png';
import cross from '../assets/cross.png';

const DisplayFormBtn = (props) => {
  const { showForm, setShowForm } = props;
  return (
    <button
      className="bg-neonPurple text-white p-1 rounded-md mt-auto self-end"
      onClick={() => setShowForm(!showForm)}
    >
      {!showForm ? (
        <img src={add} alt="add" className="h-6" />
      ) : (
        <img src={cross} alt="close" className="h-6" />
      )}
    </button>
  );
};

export default DisplayFormBtn;
