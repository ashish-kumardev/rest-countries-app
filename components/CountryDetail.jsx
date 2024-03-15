import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

export default function CountryDetail() {
  // const countryName = new URLSearchParams(location.search).get("name");
  const { country } = useParams();
  const { state } = useLocation();
  const [countryDetails, setCountryDetails] = useState(null);
  const [countryNotFound, setCountryNotFound] = useState(false);
  const [isDark] = useTheme();

  console.log(isDark);

  function updateBorders(data) {
    Promise.all(
      data.borders.map(async (border) => {
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${border}`
          );
          const [data] = await res.json();
          return data.name.common;
        } catch (err) {
          console.log("Error when fetch borders", err);
        }
      })
    )
      .then((borders) => setCountryDetails((prev) => ({ ...prev, borders })))
      .catch((err) =>
        console.log("Error while resolve promise all method", err)
      );
  }

  useEffect(() => {
    if (state) {
      setCountryDetails({ ...state, borders: [] });
      if (state.borders) {
        updateBorders(state);
      }
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryDetails({ ...data, borders: [] });
        if (data.borders) {
          updateBorders(data);
        }
      })
      .catch((err) => {
        console.log("Error when fetch country details", err);
        setCountryNotFound(true);
      });
  }, [country]);

  if (countryNotFound) {
    return <h1>Country Not Found</h1>;
  }

  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="country-details-container">
          <span className="back-button" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </span>
          {!countryDetails ? (
            <CountryDetailShimmer />
          ) : (
            <div className="country-details">
              <img
                src={countryDetails.flags.svg}
                alt={`${countryDetails.name.common} Flag`}
              />
              <div className="details-text-container">
                <h1>{countryDetails.name.common}</h1>
                <div className="details-text">
                  <p>
                    <b>Native Name: </b>
                    <span className="native-name">
                      {Object.values((countryDetails.name?.nativeName || {}))[0]?.common}
                    </span>
                  </p>
                  <p>
                    <b>Population: </b>
                    <span className="population">
                      {(+countryDetails.population).toLocaleString("en-IN")}
                    </span>
                  </p>
                  <p>
                    <b>Region: </b>
                    <span className="region">{countryDetails.region}</span>
                  </p>
                  <p>
                    <b>Sub Region: </b>
                    <span className="sub-region">
                      {countryDetails.subregion}
                    </span>
                  </p>
                  <p>
                    <b>Capital: </b>
                    <span className="capital">{countryDetails.capital}</span>
                  </p>
                  <p>
                    <b>Top Level Domain: </b>
                    <span className="top-level-domain">
                      {countryDetails.tld.join(", ")}
                    </span>
                  </p>
                  <p>
                    <b>Currencies: </b>
                    <span className="currencies">
                      {Object.values((countryDetails?.currencies || {}))
                        .map((currency) => currency.name)
                        .join(", ")}
                    </span>
                  </p>
                  <p>
                    <b>Languages: </b>
                    <span className="languages">
                      {Object.values((countryDetails?.languages || {})).join(", ")}
                    </span>
                  </p>
                </div>
                {countryDetails.borders.length !== 0 && (
                  <div className="border-countries">
                    <b>Border Countries: </b>&nbsp;
                    {countryDetails.borders.map((border) => (
                      <Link key={border} to={`/${border}`}>
                        {border}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
