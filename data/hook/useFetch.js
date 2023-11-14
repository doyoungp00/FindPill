import { useState, useEffect } from "react";
import axios from "axios";
import { parseString } from "react-native-xml2js";

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
        params:
          page == "/getItemList" ? { itemName: query } : { itemNumber: query },
      });

      console.log(JSON.stringify(response, null, 2));

      // Parse the XML data into a JavaScript object
      const parsedData = await parseXmlData(response.data);

      setData(parsedData); // Set the parsed data
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

  // Parse XML data into a JavaScript object
  const parseXmlData = (xmlData) => {
    return new Promise((resolve, reject) => {
      parseString(xmlData, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
