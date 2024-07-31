import axios from "axios";

// const URL = "http://localhost:8000";
const URL = "https://maxflow-server-production.up.railway.app";
export const registerUserApi = async (formData) => {
  try {
    const response = await axios.post(`${URL}/user/register`, formData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return {
      status: false,
    };
  }
};

export const loginUserApi = async (formData) => {
  try {
    const response = await axios.post(`${URL}/user/login`, formData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return {
      status: false,
    };
  }
};

export const userAuthApiCall = async () => {
  try {
    const response = await axios.post(
      `${URL}/user/auth`,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    return {
      status: false,
    };
  }
};

export const userLogoutApiCall = async () => {
  try {
    const response = await axios.post(
      `${URL}/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    return {
      status: false,
    };
  }
};

export const addNewTaskApiCall = async (formData) => {
  try {
    const response = await axios.post(`${URL}/task/add-new-task`, formData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    return {
      status: false,
    };
  }
};

export const getAllTasksApiCall = async (userId) => {
  console.log("userid", userId);
  try {
    console.log(`${URL}/task/get/${userId}`);
    const response = await axios.get(`${URL}/task/get/${userId}`);

    return response?.data;
  } catch (error) {
    console.log(error);
    return {
      status: false,
    };
  }
};

export const deleteTaskApiCall = async (singleTaskId) => {
  const response = await axios.delete(
    `${URL}/task/delete-task/${singleTaskId}`
  );
  return response?.data;
};

export const updateTaskApiCall = async (formData) => {
  const response = await axios.put(`${URL}/task/update-task`, formData);
  return response?.data;
};
