import React, {useState, useEffect, useRef} from 'react';
import { compare } from "./helpers/compare";
import { reset } from "../features/selected";
import ClipLoader from "react-spinners/ClipLoader"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Results = () => {
  const [description, setDescription] = useState('')
  const [errorSubmit, setErrorSubmit] = useState(false)
  const [loader, setLoader] = useState(false)
  const ref = useRef(null)

  const selectedCharacters = useSelector((state) => state.selected.value);
  const movies = useSelector((state) => state.films.value);
  const dispatch = useDispatch();

  const runSpinner = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      let results = compare(selectedCharacters, movies);
      setDescription(results);
    }, 500)
  }

  const undo = () => {
    dispatch(reset())
    setDescription('')
  }

  const submit = async () => {
    if (selectedCharacters.left && selectedCharacters.right) {
      setDescription('');
      ref.current.scrollIntoView({behavior: 'smooth'})
      runSpinner();

    } else {
      setErrorSubmit(true)
      setTimeout(() => {
        setErrorSubmit(false)
      }, 1500)
    }
  }

  const spinner =
    <div className="flex justify-center items-center">
      <ClipLoader color={"#C1BCBB"} loader={loader} size={60}/>
    </div>

  return (
    <div>
      <div className="w-screen-md mx-auto h-32 flex flex-col justify-center items-center relative">
        {errorSubmit ? (
          <p
            id="fade-text"
            className="absolute top-0 text-red-500 text-center italic"
          >
            * Must select two characters *
          </p>
        ) : null}
        <div className="flex justify-between w-1/2">
            <h1
              id="button"
              className="btn font-button bg-green-400 border-green-600"
              onClick={submit}
            >
              Submit
            </h1>

          <h1
            id="button"
            className="btn font-button bg-red-400 border-red-600"
            onClick={undo}
          >
            Reset
          </h1>
        </div>
      </div>

      <div ref={ref} className="max-w-screen-md mx-auto h-28 flex justify-center bg-gradient-to-b from-gray-600 to-gray-800">
        {loader ? spinner : null}
        <p id="fin" className="text-white text-lg mt-4 mx-3">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Results;