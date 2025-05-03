import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getData } from "../utils/api";

export const useFetchCountries = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Fetch all countries (only once)
  const {
    data: allCountries,
    isLoading: loadingCountries,
    error: countryError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await getData(
        "/v1/public/countries/list-all-countries?status=active&limit=1000"
      );
      return res?.data || [];
    },
  });

  // Automatically select Nigeria if present
  const nigeria = useMemo(() => {
    return allCountries?.find((country) => country.name === "Nigeria");
  }, [allCountries]);

  // Set Nigeria as default selection once it's found
  useMemo(() => {
    if (nigeria && !selectedCountry) {
      setSelectedCountry(nigeria);
    }
  }, [nigeria, selectedCountry]);

  // Fetch states for selected country
  const {
    data: countryDetails,
    isLoading: loadingStates,
    error: stateError,
  } = useQuery({
    queryKey: ["states", selectedCountry?.uuid],
    queryFn: async () => {
      if (!selectedCountry?.uuid) return [];
      const res = await getData(
        `/v1/public/countries/view-single-country?id=${selectedCountry.uuid}&with[]=states`
      );
      return res?.data?.states || [];
    },
    enabled: !!selectedCountry?.uuid, // only fetch when uuid is available
  });

  return {
    countries: allCountries || [],
    states: countryDetails || [],
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    loading: loadingCountries || loadingStates,
    error: countryError || stateError,
  };
};

// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { getData } from "../utils/api";

export const useFetchCity = (stateId) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const {
    data: cities,
    isLoading: loadingCities,
    error: cityError,
  } = useQuery({
    queryKey: ["cities", stateId],
    queryFn: async () => {
      if (!stateId) return [];
      const res = await getData(
        // `/v1/public/states/view-single-state?id=${stateId}&with[]=cities`
        `/v1/public/states/view-single-state?id=${stateId}&with[]=country&with[]=cities`
      );
      return res?.data?.cities || [];
    },
    enabled: !!stateId, // only fetch when stateId is available
  });

  return {
    cities: cities || [],
    selectedCity,
    setSelectedCity,
    loading: loadingCities,
    error: cityError,
  };
};

// import { useEffect, useState } from "react";

// import { getData } from "../utils/api";

// export const useFetchLocations = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch countries on mount
//   useEffect(() => {
//     const fetchCountries = async () => {
//       setLoading(true);
//       try {
//         const response = await getData(
//           "/v1/public/countries/list-all-countries?status=active&limit=1000"
//         );
//         const getNigeria = response?.data?.find(
//           (country) => country.name === "Nigeria"
//         );
//         if (getNigeria) {
//           setCountries([getNigeria]);
//           setSelectedCountry(getNigeria); // set Nigeria as selected
//         }
//       } catch (error) {
//         setError(error?.response?.data?.message || "Error fetching countries");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   // Fetch states when selectedCountry changes
//   useEffect(() => {
//     const fetchStates = async () => {
//       if (!selectedCountry?.uuid) return;

//       setLoading(true);
//       try {
//         const response = await getData(
//           `/v1/public/countries/view-single-country?id=${selectedCountry.uuid}&with[]=states`
//         );
//         const statesData = response?.data?.states || [];
//         setStates(statesData);
//       } catch (error) {
//         setError(error?.response?.data?.message || "Error fetching states");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStates();
//   }, [selectedCountry]);

//   return {
//     countries,
//     states,
//     selectedCountry,
//     setSelectedCountry,
//     selectedState,
//     setSelectedState,
//     loading,
//     error,
//   };
// };

// import { useEffect, useState } from "react";
// import { getData } from "../utils/api";

// export const FetchLocations = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   // const [cities, setCities] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   // const [selectedCities, setSelectedCities] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCountries = async () => {
//     setLoading(true);
//     try {
//       const response = await getData(
//         "/v1/public/countries/list-all-countries?status=active&limit=1000"
//       );
//       const getNigeria = response?.data?.find(
//         (country) => country.name === "Nigeria"
//       );

//       // console.log("res:", response);
//       setCountries([getNigeria]);
//     } catch (error) {
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchStates = async () => {
//     // if (!selectedCountry) return;
//     if (!countries) return;
//     setLoading(true);
//     try {
//       const response = await getData(
//         `/v1/public/countries/view-single-country?id=${countries.uuid}&with[]=states`
//       );
//       setStates(response);
//     } catch (error) {
//       setError(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStates();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [countries]);

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

//   return {
//     countries,
//     states,
//      cities,
//     selectedCountry,
//     setSelectedCountry,
//     selectedState,
//     setSelectedState,
//      selectedCities,
//      setSelectedCities,
//     loading,
//     error,
//   };
// };
