import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RestaurantProvider from "./context/RestourantProvider";
import { RestaurantType } from "./interfaces/types";
import CuisineDetail from "./pages/CuisineDetail";
import Favourites from "./pages/Favourites";
import Home from "./pages/HomePage";
// import RandomRestourantDetail from "./pages/RandomRestorantDetail";
import RestourantDetails from "./pages/RestourantDetails";

const App = () => {
  const [restourantData, setRestourantData] = useState<RestaurantType[]>([]);

  useEffect(() => {
    fetch("https://restourants.herokuapp.com/restaurants")
      .then((res) => res.json())
      .then((data) => setRestourantData(data));
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Navbar />
      {restourantData.length > 0 ? (
        <RestaurantProvider data={restourantData}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route
              path="/restourantDetails/:id"
              element={<RestourantDetails />}
            />
            <Route path="/cusines/:type" element={<CuisineDetail />} />
          </Routes>
        </RestaurantProvider>
      ) : (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
