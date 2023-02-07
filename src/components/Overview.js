import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-scroll'

const Overview = () => {
  return (
    <div className="max-w-screen-md mx-auto mb-5 h-40 flex flex-col gap-4 bg-gradient-to-b from-gray-600 to-gray-800">
      <p id="fin" className="text-white text-lg mt-4 mx-3">
        Below you can select two characters and click "Submit" to see if two
        characters are in the same movie based on their home planet, shared
        vehicles, or shared starships!
      </p>
      <Link to="panels" smooth duration={500} className="self-center">
        <button
          id="started"
          className="hidden items-center transition duration-500 sm:flex"
        >
          Get Started{" "}
          <span className="ml-1">
            <AiOutlineArrowRight />
          </span>
        </button>
      </Link>
    </div>
  );
}

export default Overview;