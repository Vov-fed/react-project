import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { data } from 'react-router-dom';

export const fetchMe = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://cardsservice.onrender.com/users/'+jwtDecode(localStorage.getItem('token'))._id,
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
    url: 'https://cardsservice.onrender.com/cards',
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
    url: `https://cardsservice.onrender.com/cards/${id}`,
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
    url: 'https://cardsservice.onrender.com/cards/',
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
    url: 'https://cardsservice.onrender.com/cards/my-cards',
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
    url: `https://cardsservice.onrender.com/cards/${id}`,
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
    url: `https://cardsservice.onrender.com/cards/${id}`,
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
    url: 'https://cardsservice.onrender.com/cards',
    headers: { 
      'x-auth-token': localStorage.getItem('token'),
    },
    data: values,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error creating card:", error.response?.data || error.message);
  }
}


export const upadateUser = async (values) => {
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://cardsservice.onrender.com/users/${jwtDecode(localStorage.getItem('token'))._id}`,
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


export const deleteCard = async (id) => {
  console.log('deleteCard called', id); // Debugging: Check if the ID is passed correctly.

  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://cardsservice.onrender.com/cards/${id}`,
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await axios.request(config);
    console.log("Card deleted successfully:", response); // Log the response
  } catch (error) {
    console.error("Error deleting card:", error.response?.data || error.message);
    alert("An error occurred while deleting the card.");
  }
};


export const deleteAccount = async () => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://cardsservice.onrender.com/users/${jwtDecode(localStorage.getItem('token'))._id}`,
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error deleting account:", error.response?.data || error.message);
    alert("An error occurred while deleting the account.");
  }
}

export const fetchAllUsers = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://cardsservice.onrender.com/users',
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  try {
    let response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    alert("An error occurred while fetching the users.");
  }
}