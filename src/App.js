import React, {useEffect} from "react";
import Header from './components/Header'
import Overview from "./components/Overview";
import Panels from './components/Panels'
import List from "./components/List";
import Results from "./components/Results"
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { films } from "./features/films";
import axios from "axios";

const App = () => {

  const bg = {
    backgroundImage: "url(https://i.ytimg.com/vi/zILpSTIy6Fw/maxresdefault.jpg"};

  const dispatch = useDispatch();

  const loadFilms = async () => {
    const data = await axios.get("https://swapi.dev/api/films/");
    const allFilms = data.data.results
    dispatch(films(allFilms))
  }

  useEffect(() => {
    loadFilms()
  }, [])

  return (
    <div className="bg-cover" style={bg}>
      <Header />
      <Overview />
      <Panels />
      <List />
      <Results />
      <Footer />
    </div>
  );
}

export default App;
