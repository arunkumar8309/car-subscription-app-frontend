import axios from 'axios';
import apiConfig from './apiConfig';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create Subscription
export const createSubscription = async (subscriptionData) => {
  return await axios.post(`${BASE_URL}/${apiConfig.createSubscription.endpoint}`, subscriptionData);
};

// List All Subscriptions
export const listSubscriptions = async () => {
  return await axios.get(`${BASE_URL}/${apiConfig.listSubscriptions.endpoint}`);
};

// Get Subscription Details
export const getSubscriptionDetails = async (subscriptionId) => {
  return await axios.get(`${BASE_URL}/${apiConfig.getSubscriptionDetails.endpoint.replace(':id', subscriptionId)}`);
};

// Update Subscription
export const updateSubscription = async (subscriptionId, updatedData) => {
  return await axios.put(`${BASE_URL}/${apiConfig.updateSubscription.endpoint.replace(':id', subscriptionId)}`, updatedData);
};

// Cancel (Delete) Subscription
export const cancelSubscription = async (subscriptionId) => {
  return await axios.delete(`${BASE_URL}/${apiConfig.deleteSubscription.endpoint.replace(':id', subscriptionId)}`);
};

// SubscriptionsCount (GET) Subscription
export const SubscriptionsCount = async () => {
  return await axios.get(`${BASE_URL}/${apiConfig.SubscriptionCount.endpoint}`);
};

