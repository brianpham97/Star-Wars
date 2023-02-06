import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reset } from "../features/selected";

const Results = () => {
  const [description, setDescription] = useState('')
  const [errorSubmit, setErrorSubmit] = useState(false)
  const [loader, setLoader] = useState(false)
  const selectedCharacters = useSelector((state) => state.selected.value);
  const dispatch = useDispatch();

  const runSpinner = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 500)
  }

  const undo = () => {
    dispatch(reset())
    setDescription('')
  }

  const submit = async () => {
    if (selectedCharacters.left && selectedCharacters.right) {
      setDescription("");
      runSpinner()
      const left = await axios.get(`https://swapi.dev/api/people/${selectedCharacters.leftId}/`);

      const right = await axios.get(
        `https://swapi.dev/api/people/${selectedCharacters.rightId}/`
      );

      compare(left.data, right.data)
    } else {
      setErrorSubmit(true)
      setTimeout(() => {
        setErrorSubmit(false)
      }, 1500)
    }
  }

  const compare = (left, right) => {
    let somethingShared = false

    while (somethingShared !== true) {
      if (left.homeworld === right.homeworld) {
        somethingShared = true
        break
      }

      let sameStarships = left.starships.filter((starship) =>
        right.starships.includes(starship)
      );
      if (sameStarships.length > 0) {
        somethingShared = true
        break
      }

      let sameVehicles = left.vehicles.filter((vehicle) =>
        right.vehicles.includes(vehicle)
      );
      if (sameVehicles.length > 0) {
        somethingShared = true
        break
      }
      break
    }

    if (somethingShared === true) {
      let sameFilms = left.films.filter((films) =>
        right.films.includes(films)
      );
      createDescription(sameFilms);
    } else {
      let output = `${selectedCharacters.left} and ${selectedCharacters.right} have no matching planets, vehicles, or starships.`;
      setDescription(output)
      setLoader(false);
    }
  }

  const createDescription = async (films) => {
    if (films.length === 0) {
      let output = `${selectedCharacters.left} and ${selectedCharacters.right} have no movies together.`;
      setDescription(output)
      setLoader(false);
      return
    }

    let movieList = []
    for (let film of films) {
      let movie = await axios.get(film)
      movieList.push(movie.data.title)
    }
    let queryString = movieList.reduce((accumulator, movie) => accumulator + movie + ', ', '')
    queryString = queryString.slice(0, queryString.length - 2)
    let output = `${selectedCharacters.left} and ${selectedCharacters.right} both appear in ${queryString}.`
    setDescription(output)
    setLoader(false);
  }

  const spinner =
    <div className="flex, justify-center items-center">
      <ClipLoader color={"#C1BCBB"} loader={loader} size={60}/>
    </div>

  return (
    <div>
      <div className="w-screen-md mx-auto h-32 flex flex-col justify-center items-center relative">
        {errorSubmit ? (
          <p id="fade-text" className="absolute top-0 text-red-500 text-center italic">
            * Must select two characters *
          </p>
        ) : null}
        <div className="flex justify-between w-1/2">
          <h1
            id="button"
            className="submit font-button bg-green-400 border-green-600"
            onClick={submit}
          >
            Submit
          </h1>
          <h1
            id="button"
            className="reset font-button bg-red-400 border-red-600"
            onClick={undo}
          >
            Reset
          </h1>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto h-28 flex justify-center bg-gradient-to-b from-gray-600 to-gray-800">
        {loader ? spinner : null}
        <p id="fin" className="text-white text-lg mt-4 mx-3">{description}</p>
      </div>
    </div>
  );
}

export default Results;