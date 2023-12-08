import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (page, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request({
        method: "GET",
        url: process.env.EXPO_PUBLIC_BACKEND + page,

        // 'itemName'   parameter for 'getItemList'   page
        // 'itemNumber' parameter for 'getItemDetail' page
        params:
          page == "/getItemList" ? { itemName: query } : { itemNumber: query },
      });

      // console.log(JSON.stringify(response, null, 2));

      setData(response.data); // Set the parsed data
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("결과를 불러오지 못했습니다.\n" + error);

      // Log the error and loading status when an error occurs
      console.error("Error:", error);
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
