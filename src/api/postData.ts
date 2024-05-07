import axios, { AxiosResponse } from 'axios';
import { UserCredentials } from '../interfaces/userCredentials';
const postData = async (userData: UserCredentials): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.post('url', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export default postData;
