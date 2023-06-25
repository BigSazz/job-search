import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from '@env'
import { set } from "react-native-reanimated";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
		  'X-RapidAPI-Key': rapidApiKey,
		  'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
		},
		params: {...query},
	};

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const res = await axios.request(options);
			setData(res.data.data);
			setIsLoading(false);
		} catch (error) {
			setError(error);
			alert('Something went wrong, please try again later.')
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
}

export default useFetch;