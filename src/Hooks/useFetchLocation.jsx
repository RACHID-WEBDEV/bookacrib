import { useEffect, useState } from "react";
import { getData } from "../utils/api";

export const FetchLocations = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  // const [selectedCities, setSelectedCities] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await getData(
        "/v1/public/countries/list-all-countries?status=active&limit=1000"
      );
      const getNigeria = response?.data?.find(
        (country) => country.name === "Nigeria"
      );

      // console.log("res:", response);
      setCountries(getNigeria);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchStates = async () => {
    if (!selectedCountry) return;
    setLoading(true);
    try {
      const response = await getData(
        `/v1/public/countries/view-single-country?id=${selectedCountry.uuid}&with[]=states`
      );
      setStates(response);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  // const fetchCities = async () => {
  //   if (!selectedState) return;
  //   setLoading(true);
  //   try {
  //     const response = await getData(`customer/states/${selectedState.id}`);
  //     setCities(response);
  //   } catch (error) {
  //     setError(error.response.data.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCities();
  // }, [selectedState]);

  return {
    countries,
    states,
    // cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    // selectedCities,
    // setSelectedCities,
    loading,
    error,
  };
};

// export const FetchDestinationLocations = () => {
//   const [countriesD, setCountriesD] = useState([]);
//   const [statesD, setStatesD] = useState([]);
//   const [citiesD, setCitiesD] = useState([]);

//   const [selectedCountryD, setSelectedCountryD] = useState(null);
//   const [selectedStateD, setSelectedStateD] = useState(null);
//   const [selectedCitiesD, setSelectedCitiesD] = useState(null);

//   const [loadingD, setLoadingD] = useState(false);
//   const [errorD, setErrorD] = useState(null);

//   const fetchCountriesDestination = async () => {
//     setLoadingD(true);
//     try {
//       const response = await getData("customer/countries");
//       setCountriesD(response);
//     } catch (error) {
//       setErrorD(error.response.data.message);
//     } finally {
//       setLoadingD(false);
//     }
//   };

//   useEffect(() => {
//     fetchCountriesDestination();
//   }, []);

//   const fetchDestinationStates = async () => {
//     if (!selectedCountryD) return;
//     setLoadingD(true);
//     try {
//       const response = await getData(`customer/country/${selectedCountryD.id}`);
//       setStatesD(response);
//     } catch (error) {
//       setErrorD(error.response.data.message);
//     } finally {
//       setLoadingD(false);
//     }
//   };

//   useEffect(() => {
//     fetchDestinationStates();
//   }, [selectedCountryD]);

//   const fetchDestinationCities = async () => {
//     if (!selectedStateD) return;
//     setLoadingD(true);
//     try {
//       const response = await getData(`customer/states/${selectedStateD.id}`);
//       setCitiesD(response);
//     } catch (error) {
//       setErrorD(error.response.data.message);
//     } finally {
//       setLoadingD(false);
//     }
//   };

//   useEffect(() => {
//     fetchDestinationCities();
//   }, [selectedStateD]);

//   return {
//     countriesD,
//     statesD,
//     citiesD,
//     selectedCountryD,
//     setSelectedCountryD,
//     selectedStateD,
//     setSelectedStateD,
//     selectedCitiesD,
//     setSelectedCitiesD,
//     loadingD,
//     errorD,
//   };
// };
