import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";

const List = () => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    let incomingData = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
    let characterSet = incomingData.data.results
    let count = 1
    let errorHandled = false
    if (page > 1) {
      count = (page - 1) * 10 + 1
    }
    for (let character of characterSet) {
      if (count === 17 && errorHandled === false) {
        count++;
        errorHandled = true
      }
      character.id = count
      count++
    }
    setData(characterSet)
  };

  const changePage = (direction) => {
    direction === 'back' ? setPage((prev) => prev - 1) : setPage((prev) => prev + 1)
  }

  const characters = data.map((character, i) => {
    return <Character key={i} name={character.name} id={character.id}/>
  })

  return (
    <div>
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
      <div id="rotate" className="h-60 w-full grid grid-cols-4 gap-4 sm:grid-cols-5 bg-black text-white">
        {characters}
      </div>

    </div>
  );
};

export default List;
