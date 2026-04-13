import js from '@eslint/js';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!!url);
    const [error, setError] = useState(null);
    const optionsRef = useRef(options);

    const fetchData = useCallback(async (fetchUrl) => {
        if(!fetchUrl) return;
        const controller = new AbortController();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(fetchUrl, {
                ...optionsRef.current,
                signal: controller.signal,
            });
            if(!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const json = await res.json();
            setData(json);
        } catch (err) {
            if(err.name !== "AborError") setError(err.message);
            
        }finally {
            setLoading(false);
        }
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const cleanup = fetchData(url);
        return () => {if(cleanup) cleanup();};
    },[url, fetchData]);

    const refetch = useCallback(() => fetchData(url), [url, fetchData]);

    return {data, loading, error, refetch}
} 

export default useFetch;
