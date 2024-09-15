import axios from 'axios';

const BASE_URL = '/api';

// helper function to extract error
const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'An error occurred';
  }
  return 'An unknown error occurred';
};

// create a new ticket
export const createTicket = async (ticketData: { title: string; description: string; contact: { name: string; email: string; phone: string; } }) => {
  try {
    const response = await axios.post(`${BASE_URL}/tickets`, {
      title: ticketData.title,
      description: ticketData.description,
      contactInformation: {
        name: ticketData.contact.name,
        email: ticketData.contact.email,
        phone: ticketData.contact.phone
      }
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

// update a ticket
export const updateTicket = async (taskId: string, body: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/tickets/${taskId}`, { id: taskId, ...body});
    return response.data
  } catch (error) {
    console.error('Error updating ticket position:', error);
  }
};

// update a ticket
export const getAllTicket = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tickets`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
