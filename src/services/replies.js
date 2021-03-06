import { API_URL_REPLIES } from "./index.js";

export const getReplies = async () => {
  try {
    const response = await fetch(API_URL_REPLIES, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    });
    const allReplies = await response.json();
    return await allReplies.data.replies;
  } catch (error) {
    console.log(error);
  }
};

export const getRepliesByDocumentId = async (type, id) => {
  try {
    const response = await fetch(`${API_URL_REPLIES}/${type}/${id}`, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    });
    const RepliesByDocument = await response.json();
    return await RepliesByDocument.data.replies;
  } catch (error) {
    console.log(error);
  }
};

export const getCountRepliesByDocument = async (type, id) => {
  try {
    const response = await fetch(`${API_URL_REPLIES}/count/${type}/${id}`, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    });
    const RepliesByDocument = await response.json();
    return await RepliesByDocument.data.replies;
  } catch (error) {
    console.log(error);
  }
};

export const getReplyById = async (id) => {
  try {
    const response = await fetch(`${API_URL_REPLIES}/${id}`, {
      headers: {
        "authorization": localStorage.getItem("token")
      }
    });
    const singleReply = await response.json();
    return await singleReply.data.replies;
  } catch (error) {
    console.log(error);
  }
};

export const postReply = async (data) => {
  const response = await fetch(API_URL_REPLIES, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      "authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const patchReply = async (id, data) => {
  const response = await fetch(`${API_URL_REPLIES}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/JSON",
      "authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteReply = async (id) => {
  const response = await fetch(`${API_URL_REPLIES}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/JSON",
      "authorization": localStorage.getItem("token")
    },
  });
  return await response.json();
};

//------------------------   usage example ----------------------

/*

import { getRepliesByDocumentId, getReplyById } from "./services/replies";

const example = async () => {
    console.log(await getRepliesByDocumentId("replies","60c451f27549e5114cbd6832"));
};

*/

//---------------------------------------------------------------

