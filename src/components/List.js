import React, { useState, useEffect } from "react";
import Character from "./Character";
import { CgArrowLeft, CgArrowRight } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const List = () => {
  const [page, setPage] = useState(1)

  const getData = async () => {
    const { data } = await axios.get(
      `https://swapi.dev/api/people/?page=${page}`
    );
    const characterSet = data.results
    return characterSet
  }

  const characterData = useQuery({
    queryKey: ['characters', {page}],
    keepPreviousData: true,
    queryFn: () => getData(),
    initialData: []
  })

    const characters = characterData.data.map((character, i) => {
      return <Character key={i} character={character} />;
    });

  return (
    <>
      <div className="max-w-screen-lg mx-auto py-4 flex justify-between">
        {page > 1 ? (
          <h3
            id="button"
            disabled={characterData.isLoading}
            onClick={() => setPage((prev) => prev - 1)}
            className="direction font-button bg-black text-[gold] border-[gold] ml-4 transition duration-500"
          >
            Back
          </h3>
        ) : (
          <h3 id="transparent" className="text-transparent">
            Back
          </h3>
        )}

        <div className="hidden justify-center items-center gap-5 text-[gold] sm:flex">
          <CgArrowLeft />
          <h3 className="font-button ">- - - See more characters - - -</h3>
          <CgArrowRight />
        </div>

        {page < 9 ? (
          <h3
            id="button"
            disabled={characterData.isLoading}
            onClick={() => setPage((prev) => prev + 1)}
            className="direction font-button bg-black text-[gold] border-[gold] mr-4 transition duration-500"
          >
            Next
          </h3>
        ) : (
          <h3 id="transparent" className="text-transparent">
            Next
          </h3>
        )}
      </div>

      <div className="h-60 w-full grid grid-cols-4 gap-4 sm:grid-cols-5 bg-black">
        {characters}
      </div>
    </>
  );
};

export default List;
