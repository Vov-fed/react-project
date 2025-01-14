import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { data } from 'react-router-dom';

export const fetchMe = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/'+jwtDecode(localStorage.getItem('token'))._id,
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    let response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    alert("An error occurred while fetching the user.");
  }
}

export const fetchAllCards = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
  };
  try {
    let response = await axios.request(config);
    return response.data.reverse();
  } catch (error) {
    console.error("Error fetching cards:", error.response?.data || error.message);
    alert("An error occurred while fetching the cards.");
  }
}

export const likeSomeCard = async (id) => {
  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    }
  };
  try {
    await axios.request(config).catch(function (error) {
      console.error("Error liking card:", error.response?.data || error.message);
      alert("An error occurred while liking the card.");
    });
  } catch (error) {
    console.error("Error liking card:", error.response?.data || error.message);
    alert("An error occurred while liking the card.");
  }
}


export const fetchAllLikedCards = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/',
  };
  try {
    let response = await axios.request(config);
    response.data = response.data.filter(card => card.likes.includes(jwtDecode(localStorage.getItem('token'))._id));
    return response.data;
  } catch (error) {
    console.error("Error fetching liked cards:", error.response?.data || error.message);
    alert("An error occurred while fetching the liked cards.");
  }
}

export const fetchAllMyCards = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards',
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    let response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching my cards:", error.response?.data || error.message);
    alert("An error occurred while fetching the my cards.");
  }
}

export const getCardById = async (id) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
  };
  try {
    let response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching card:", error.response?.data || error.message);
    alert("An error occurred while fetching the card.");
  }
}

export const updateCard = async (id, values) => {
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    },
    data: values,
  };
  try {
    await axios.request(config);
  } catch (error) {
    console.error("Error updating card:", error.response?.data || error.message);
    alert("An error occurred while updating the card.");
  }
}

export const createCard = async (values) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    },
    data: values,
  };
  try {
    await axios.request(config);
  } catch (error) {
    console.error("Error creating card:", error.response?.data || error.message);
    alert("An error occurred while creating the card.");
  }
}


export const upadateUser = async (values) => {
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${jwtDecode(localStorage.getItem('token'))._id}`,
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    },
    data: values,
  };
  try {
    await axios.request(config);
  } catch (error) {
    alert("Error updating user:", error.response?.data || error.message);
  }
}