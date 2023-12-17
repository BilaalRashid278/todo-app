
const BASE_URI = 'http://localhost:3000/api/v1';
const UseFetch = async (url,options) => {
    const data = await fetch(`${BASE_URI}${url}`,options);
    return data
};

export default UseFetch;
