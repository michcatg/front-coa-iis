const fetchData = async (backendUrl,endpoint, method='GET', options = {}, params) => {
  const url = `${backendUrl}/${endpoint}${params}`;
  try{
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: options.body,
      ...options,
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

const get = async (backendUrl,endpoint, params, options = {}) => await fetchData(
  backendUrl,
  endpoint,
  'GET',
  options,
  params ? `?${new URLSearchParams(params)}` : ''
);

export { get };