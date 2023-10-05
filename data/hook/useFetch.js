import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Drug info API URL
  var url =
    "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
  // Add API service key
  var serviceKey =
    "7LPlJZysFfUjfUK8PlftpGEKPZ1sxGwHOO9acbYA4MO%2FL6Z61cqKGMpSp3depPEJFI9D58Ard1RRCnVMf5%2BCjg%3D%3D";
  url += "?serviceKey=" + serviceKey;
  // Set result item count to 10
  url += encodeURIComponent("&numOfRows=10");
  // Add search params
  url += encodeURIComponent("&itemName=" + query);

  const options = {
    method: "GET",
    url: url,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("Something went wrong.\n" + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
