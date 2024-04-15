import axios from "axios";

export const BASE_URL = "http://213.230.107.91:9090/api";

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
