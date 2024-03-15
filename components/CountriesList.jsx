import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([]);
  // console.log(query);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });

    // const intervalId = setInterval(() => {
    //   console.log('running countriesList component');
    // }, [1000])

    // console.log(intervalId);

    return () => {
      // console.log("Component Unmount Clean Up");
    };
  }, []);

  return (
    <>
      {
        !countriesData.length ? <CountriesListShimmer /> : <div className="countries-container">
        {countriesData
          .filter((country) => {
            if (query === "filter by region") return country;
            if (country.region.toLowerCase().includes(query)) return country;
            if (country.name.common.toLowerCase().includes(query))
              return country;
          })
          .map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
              />
            );
          })}
      </div>
      }
    </>
  );
}
