import axios from "axios";

const rawBase = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const baseURL = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

export const api = axios.create({
  baseURL,
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
