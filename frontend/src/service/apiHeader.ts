const headerApiInternal = {
  timeout: 30000,
  headers: {
    "content-Type": "application/json",
    apikey: process.env.REACT_APP_IP_INTERNAL_APIKEY,
  },
  auth: {
    username: process.env.REACT_APP_USERNAME,
    password: process.env.REACT_APP_PASSWORD,
  },
};

export default headerApiInternal;
