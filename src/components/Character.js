import React, { useState, useEffect } from "react";
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { select } from '../features/selected'

const Character = ({name, id}) => {

  const selectedCharacters = useSelector((state) => state.selected.value);
  const dispatch = useDispatch()
  const [highlightName, setHighlightName] = useState(false);

  const selectCharacter = (character, id) => {
    if (selectedCharacters.left === character) {
      dispatch(select({...selectedCharacters, left: null, leftId: null}))
      return;
    }

    if (selectedCharacters.right === character) {
      dispatch(select({ ...selectedCharacters, right: null, rightId: null }));
      return;
    }

    if (selectedCharacters.left === null) {
      dispatch(select({ ...selectedCharacters, left: character, leftId: id }));
    } else if (selectedCharacters.left !== null && selectedCharacters.right === null) {
      dispatch(select({ ...selectedCharacters, right: character, rightId: id }));
    }
  };

  useEffect(() => {
    if (name === selectedCharacters.left || name === selectedCharacters.right) {
      setHighlightName(true)
    } else {
      setHighlightName(false)
    }
  }, [name, selectedCharacters.left, selectedCharacters.right])

  return (
    <div className="flex justify-center items-center">
      <h1 style={highlightName ? {color: 'gold', textShadow: '0 0 5px #ffff80'} : {}} className="cursor-pointer font-courier text-center hover:scale-x-[1.03]" onClick={() => selectCharacter(name, id)}>{name}</h1>
    </div>
  );
}

export default Character;