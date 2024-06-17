import axios from "axios";
import { useEffect, useState } from "react";

const getCachedData = (key) => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
};

const setCachedData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};


const useAxiosGetWithCache = (dataUrl, requestOptions, cacheKey, expirationTime = 3600) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        let isMounted = true;
        let source = axios.CancelToken.source();

        const fetchData = async () => {

            if (cacheKey !== false) {

                const cachedData = getCachedData(cacheKey);
                
                if (cachedData && Date.now() - cachedData.timestamp < expirationTime * 1000) {  

                    if (isMounted){
                        setData(cachedData.data);
                        setError(null);
                        setLoading(false);
                        return;
                    }

                }

            }

            try {

                const request = await axios.request(dataUrl, requestOptions, {
                    cancelToken: source.token
                });

                if (isMounted) {
                    setData(request.data);
                    setCachedData(cacheKey, { data: request.data, timestamp: Date.now() })
                    setError(null);
                }


            } catch (err) {

                if (isMounted) {

                    setData([]);

                    if (err.response) {
                        console.log(err);
                        console.log(err.response.data);
                        console.log(err.response.headers);
                        console.log(err.response.status);
                        setError(err.message);
                    } else if (err.request) {
                        console.log(err)
                        console.log(err.message)
                        setError(err.message);
                    } else {
                        console.log(err)
                        console.log(err.message);
                        setError(err.message);
                    }
                }

            } finally {
                // if (isMounted) setTimeout(() => {
                //     setLoading(false);
                // }, 2000)

                if (isMounted) setLoading(false)
            }

        }

        setLoading(true);
        fetchData();

        return () => {
            isMounted = false;
            source.cancel();
        }

    }, [dataUrl, requestOptions, cacheKey, expirationTime])

    return { data, error, loading }

}

export default useAxiosGetWithCache;
