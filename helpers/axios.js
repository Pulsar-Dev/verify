const axiosC = require("axios");
const axiosRetry = require('axios-retry');

const axios = axiosC.create({
    baseURL: 'https://verify.lythium.vip',
    timeout: 5000,
});
axiosRetry(axios, { retries: 0 });

export default axios