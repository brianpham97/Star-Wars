import React from "react";
import Header from './components/Header'
import Panels from './components/Panels'
import List from "./components/List";
import Results from "./components/Results"
import Footer from "./components/Footer";

const App = () => {

  const bg = {
    backgroundImage: "url(https://i.ytimg.com/vi/zILpSTIy6Fw/maxresdefault.jpg"};

  return (
    <div className="bg-cover" style={bg}>
      <Header />
      <Panels />
      <List />
      <Results />
      <Footer />
    </div>
  )
}

export default App;
