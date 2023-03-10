import React, { useState, useEffect } from "react";
import { removeCharacter, updateCharacter } from "./helpers/select";
import { select } from "../features/selected";
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";


const Character = ({character}) => {

  const selectedCharacters = useSelector((state) => state.selected.value);
  const dispatch = useDispatch()
  const [isHighLighted, setIsHighLighted] = useState(false);

  const selectCharacter = (character) => {
    if (selectedCharacters.left === character.name) {
      let template = removeCharacter('left')
      dispatch(
        select({
          ...selectedCharacters,
          ...template
        })
      );
      return;
    }

    if (selectedCharacters.right === character.name) {
      let template = removeCharacter('right')
      dispatch(
        select({
          ...selectedCharacters,
          ...template
        })
      );
      return;
    }

    if (selectedCharacters.left === null) {
      const info = updateCharacter(character)
      dispatch(
        select({
          ...selectedCharacters,
          left: character.name,
          leftFilms: info.films,
          leftHomeworld: info.homeworld,
          leftVehicles: info.vehicles,
          leftStarships: info.starships,
          leftUrl: info.url
      }));
    } else if (selectedCharacters.left !== null && selectedCharacters.right === null) {
      const info = updateCharacter(character);
      dispatch(
        select({
          ...selectedCharacters,
          right: character.name,
          rightFilms: info.films,
          rightHomeworld: info.homeworld,
          rightVehicles: info.vehicles,
          rightStarships: info.starships,
          rightUrl: info.url,
        })
      );
    }
  };

  useEffect(() => {
    if (character.name === selectedCharacters.left || character.name === selectedCharacters.right) {
      setIsHighLighted(true)
    } else {
      setIsHighLighted(false)
    }
  }, [character.name, selectedCharacters])

  return (
    <div className="flex justify-center items-center text-white">
      <h1 style={isHighLighted ? {color: 'gold', textShadow: '0 0 5px #ffff80'} : {}} className="cursor-pointer font-courier text-lg text-center ml-1 hover:scale-x-[1.03] sm:text-xl" onClick={() => selectCharacter(character)}>{character.name}</h1>
    </div>
  );
}

export default Character;