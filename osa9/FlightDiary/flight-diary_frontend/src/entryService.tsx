import axios from 'axios';
import { Entry, NewEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<Entry[]>(baseUrl)
    .then(response => response.data)
 
}

export const createEntry = async (object: NewEntry) => {
  try {
    return await axios
      .post<Entry>(baseUrl, object)
      .then(response => response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('axios error')
      if (error.response) {
        console.log('errordata', error.response.data)
        console.log(typeof(error.response.data))
        throw new Error(error.response.data)
      }
      throw new Error('Something went wrong')
    } else {
      throw new Error('Something went wrong')
    }
  }
}