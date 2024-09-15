const apiConfig = {
  createSubscription: {
    name: "Create Subscription",
    endpoint: "api/subscriptions",
    method: "POST",
  },
  listSubscriptions: {
    name: "List Subscriptions",
    endpoint: "api/subscriptions",
    method: "GET",
  },
  getSubscriptionDetails: {
    name: "Get Subscription Details",
    endpoint: "api/subscriptions/:id",
    method: "GET",
  },
  updateSubscription: {
    name: "Update Subscription",
    endpoint: "api/subscriptions/:id",
    method: "PUT",
  },
  deleteSubscription: {
    name: "Delete Subscription",
    endpoint: "api/subscriptions/:id",
    method: "DELETE",
  },
  SubscriptionCount: {
    name: "Subscription Count",
    endpoint: "api/subscriptions/daily-count",
    method: "GET",
  },
};



export default apiConfig;
