import React from 'react';

const Header = () => {

  return (
    <div className="w-full h-[30vh] overflow-hidden pt-2 sm:h-[20vh]">
      <div
        id="star-wars"
        className="max-w-screen-lg h-full m-auto flex flex-col items-center"
      >
        <h1 className="text-yellow-300 text-3xl italic mx-2">
          A long time ago, in a galaxy far, far away...
        </h1>
        <div className="h-60 w-72 sm:w-60">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Star_Wars_Logo..png"
            className="h-full w-full object-cover object-center"
          alt="Star Wars"/>
        </div>
      </div>
    </div>
  );
}

export default Header;