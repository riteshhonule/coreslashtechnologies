import axios from "axios";

import { envConfig } from "../config/env.config";

export const api = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitContact = (data: { 
  name: string; 
  email: string; 
  phone: string; 
  address?: string; 
  businessType?: string; 
  service?: string;
  message: string 
}) => api.post("/contacts", data);

export const submitLead = (data: {
  name: string;
  phone: string;
  city: string;
  service?: string;
}) => api.post("/leads", data);

export const loginSuperadmin = (data: any) => api.post("/contacts/login", data);

export const getContacts = (token: string) =>
  api.get("/contacts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
