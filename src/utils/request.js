export default async (url, config = {}) => {
  let statusCode = 0;
  const data = await fetch(url, config);
  statusCode = data.status;
  const res = await data.json();
  switch (statusCode) {
    case 200:
      return res;
    case 201:
      return res;
    case 400:
      throw res;
    default:
      throw res;
  }
};
