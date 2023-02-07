import React, { useState, useEffect } from "react";
import { updateCharacter, removeCharacter } from "./helpers/select";
import { select } from "../features/selected";
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";


const Character = ({character}) => {

  const selectedCharacters = useSelector((state) => state.selected.value);
  const dispatch = useDispatch()
  const [highlightName, setHighlightName] = useState(false);

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
      setHighlightName(true)
    } else {
      setHighlightName(false)
    }
  }, [character.name, selectedCharacters])

  return (
    <div className="flex justify-center items-center">
      <h1 style={highlightName ? {color: 'gold', textShadow: '0 0 5px #ffff80'} : {}} className="cursor-pointer font-courier text-center hover:scale-x-[1.03]" onClick={() => selectCharacter(character)}>{character.name}</h1>
    </div>
  );
}

export default Character;