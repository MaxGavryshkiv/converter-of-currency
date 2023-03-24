import { api } from "./configs/axiosConfigs";

export const CurrencyAPI = {
  get: async function (currency) {
    const response = await api.request({
      url: `/latest?base=${currency}`,
      method: "GET",
      headers: { apikey: "PkyKr4lySBl3CfVhRbb89xQTufyFZDBT" },
    });

    return response.data;
  },

  getReqCurrency: async function (fromCurrency, toCurrency) {
    const response = await api.request({
      url: `/latest?symbols=${toCurrency}&base=${fromCurrency}`,
      method: "GET",
      headers: { apikey: "PkyKr4lySBl3CfVhRbb89xQTufyFZDBT" },
    });

    return response.data.results;
  },
};
