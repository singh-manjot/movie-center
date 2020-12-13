export const getUrlIfImageExists = (url) => {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();

  return http.status !== 404
    ? url
    : process.env.PUBLIC_URL + "/imgNotAvailable.png";
};
