import React, { useState, useEffect } from "react";
import Character from "./Character";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import axios from "axios";

const List = () => {
  const [page, setPage] = useState(1)
  const [memo, setMemo] = useState({}) //creating a memo beacuse API is slow sometimes
  const [characterData, setCharacterData] = useState([])

  const changePage = (direction) => {
    direction === "back"
      ? setPage((prev) => prev - 1)
      : setPage((prev) => prev + 1);
  };

  const getData = async () => {
    if (memo[page] === undefined) {
      let incomingData = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      let characterSet = incomingData.data.results;
      setMemo({...memo, [page] : characterSet})
      setCharacterData(characterSet);
    } else {
      setCharacterData(memo[page])
    }
  };

    useEffect(() => {
      getData();
    }, [page]);

  const characters = characterData.map((character, i) => {
    return <Character key={i} character={character}/>
  })

  return (
    <>
      <div className="max-w-screen-lg mx-auto py-4 flex justify-between">
        {page > 1 ? (
          <h3
            id="button"
            onClick={() => changePage("back")}
            className="direction font-button bg-black text-[gold] border-[gold] ml-4 transition duration-500"
          >
            Back
          </h3>
        ) : (
          <h3 id="transparent" className="text-transparent">Back</h3>
        )}

        <div className="hidden justify-center items-center gap-5 text-[gold] sm:flex">
          <CgArrowLeft />
          <h3 className="font-button ">- - - See more characters - - -</h3>
          <CgArrowRight />
        </div>

        {page < 9 ? (
          <h3
            id="button"
            onClick={() => changePage("next")}
            className="direction font-button bg-black text-[gold] border-[gold] mr-4 transition duration-500"
          >
            Next
          </h3>
        ) : (
          <h3 id="transparent" className="text-transparent">Next</h3>
        )}
      </div>

      <div className="h-60 w-full grid grid-cols-4 gap-4 sm:grid-cols-5 bg-black">
        {characters}
      </div>
    </>
  );
};

export default List;
