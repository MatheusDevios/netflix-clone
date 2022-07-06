import "./App.css";
import Row from "./components/Row";
import categories from "./api";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import React, { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loading">
          <img
            src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif"
            alt="Loading"
          />
        </div>
      ) : (
        <div>
          <Nav />
          <Banner />
          {categories.map((category) => {
            return (
              <Row
                key={category.name}
                title={category.title}
                path={category.path}
                isLarge={category.isLarge}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
