import { useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../store/slices/user.slice";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

const useSearchUser = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = (username) => {
    setLoading(true);
    axios
      .get(`${api}/user/search?query=${username}`, getConfig())
      .then((res) => {
        setResults(res.data);
        dispatch(setSearchResults(res.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  };

  return { query, setQuery, results, loading, fetchResults };
};

export default useSearchUser;
