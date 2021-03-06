import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useHistory, useParams } from "react-router";
import { movieContext } from "../../contexts/MovieContext";
import Carousal from "./3dCarousal/Carousal";
import FilterSelect from "../../components/FilterSelect/FilterSelect.js";
import Footer from "../../components/Footer/Footer"

export default function Showing() {
  const { searchValue, id } = useParams();
  const {
    movies,
    fetchMovies,
    fetchSearchMovies,
    fetchGenres,
    genres,
    fetchFilterMovies,
  } = useContext(movieContext);

  useEffect(() => {
    fetchMovies(id);
    fetchSearchMovies(searchValue);
    // fetchGenres();
    console.log(genres);
  }, [id, searchValue]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "50px",
        }}
      >
        <p style={{ color: "white" }}>NOW SHOWING</p>
      </div>
      {/* {genres.map((genre) => {
        <button title={genre}></button>
      })}
      <button /> */}
      <Carousal style={{ marginBottom: "40px" }} />
      <div style={{ margin: "100px auto" }}>
        <FilterSelect style={{ alignItem: "center" }} />
      </div>
      <Footer />
    </div>
  );
}
