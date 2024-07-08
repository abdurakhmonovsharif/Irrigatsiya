import axios from "axios";

export const BASE_URL = "https://sayt.tiiamebb.uz:9090/api";

const AxiosCall = async (method, url, params) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method: method,
      data: params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default AxiosCall;
