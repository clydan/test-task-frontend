
import { useEffect, useState } from "react";

const useFetch = (endpointUrl) => {
    const [data, setdata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(endpointUrl)
            .then(res => {
                if(!res.ok){
                    throw Error('Could not connect to server');
                }
                return res.json();
            })
            .then(data => {
                setdata(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            });
    }, []);

    return {data, isLoading, error};
}

export default useFetch;