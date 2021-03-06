import { API_URL_USERS } from "./index.js";

export const getUsers = async () => {
  try {
    const response = await fetch(API_URL_USERS, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    });
    const allUser = await response.json();
    return await allUser.data.users;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL_USERS}/${id}`);
    const singleUser = await response.json();
    return await singleUser.data.users;
  } catch (error) {
    console.log(error);
  }
};

export const postUser = async (data) => {
  try {
    const response = await fetch(API_URL_USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const postLogin = async (data) => {
  try {
    const response = await fetch(`${API_URL_USERS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const patchUser = async (id, data) => {
  try {
    const response = await fetch(`${API_URL_USERS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/JSON",
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL_USERS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/JSON",
        "authorization": localStorage.getItem("token")
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};




