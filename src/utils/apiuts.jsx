const BASE_URL = "http://127.0.0.1:8001";

export const loadImage = (image_path) => {
  return BASE_URL + "/public" + image_path;
};

export const getDataUTS = async (url) => {
  return fetch(BASE_URL + url)
    .then((response) =>
      response.status >= 200 &&
      response.status <= 299 &&
      response.status !== 204
        ? response.json()
        : response,
    )
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const sendDataUTS = async (url, data) => {
  //401 -> jwt expired, flow process to login
  //400 -> jwt malformed
  //204 -> No Content, but success
  //NOTE : You must special handle for HTTP status above
  const options = {
    method: "POST",
  };
  // Add body only if data exists
  if (data) {
    options.body = data;
  }
  console.log(options);

  return fetch(BASE_URL + url, options)
    .then((response) =>
      response.status === 401
        ? { isExpiredJWT: true }
        : response.status >= 200 &&
            response.status <= 299 &&
            response.status !== 204
          ? response.json()
          : response,
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteDataUTS = async (url, data) => {
  return fetch(BASE_URL + url, {
    method: "DELETE",
    body: data,
  })
    .then((response) =>
      response.status === 401
        ? { isExpiredJWT: true }
        : response.status >= 200 &&
            response.status <= 299 &&
            response.status !== 204
          ? response.json()
          : response,
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};
