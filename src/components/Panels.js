import React, { useState, useEffect } from "react";
import {photos} from '../pictures/photos'
import { useSelector } from "react-redux";

const Panels = () => {
  const selectedCharacters = useSelector((state) => state.selected.value);

  let styleL = selectedCharacters.left !== null ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${photos[selectedCharacters.left]})`} : {}

  let styleR = selectedCharacters.right !== null ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${photos[selectedCharacters.right]})`} : {}

  let panelL =
    selectedCharacters.left !== null ? (
      <div
        style={styleL}
        id="card"
        className="left flex flex-col justify-end h-[50vh] w-[23rem] bg-cover bg-center"
      >
        <p className="font-name text-white text-2xl mb-3 text-center">
          {selectedCharacters.left}
        </p>
      </div>
    ) : (
      <div
        className="left flex flex-col justify-end h-[50vh] w-[23rem]">
      </div>
    );

    let panelR =
      selectedCharacters.right !== null ? (
        <div
          style={styleR}
          id="card"
          className="right flex flex-col justify-end h-[50vh] w-[23rem] bg-cover bg-center"
        >
          <p className="font-name text-white text-2xl mb-3 text-center">
            {selectedCharacters.right}
          </p>
        </div>
      ) : (
        <div
          className="right flex flex-col justify-end h-[50vh] w-[23rem]">
        </div>
      );

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col justify-between items-center gap-4 mb-4 sm:flex-row">
      {panelL}
      {panelR}
    </div>
  );
};

export default Panels;
