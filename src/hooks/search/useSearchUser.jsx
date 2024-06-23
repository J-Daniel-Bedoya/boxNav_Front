// useSearchUser.js
import { useState, useEffect } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

const useSearchUser = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 0) {
        setLoading(true);
        axios
          .get(`${api}/user/search?query=${query}`, getConfig())
          .then((res) => {
            setResults(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
            setResults([]);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return { query, setQuery, results, loading };
};

export default useSearchUser;
