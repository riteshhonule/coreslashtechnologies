import axios from "axios";

import { envConfig } from "../config/env.config";

export const api = axios.create({
  baseURL: envConfig.apiUrl,
  timeout: 15000,
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

export const getInquiries = (token: string) =>
  api.get("/inquiries", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getCandidates = (token: string, filters: any = {}) =>
  api.get("/candidates", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  });

export const updateCandidateStatus = (token: string, id: string, status: string) =>
  api.patch(`/candidates/${id}/status`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMarketingInquiries = (token: string) =>
  api.get("/marketing-inquiries", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const verifyCertificate = (certificateNumber: string) =>
  api.post("/certificate/verify", { certificateNumber });

export const getCertificatesAdmin = (token: string, params: any = {}) =>
  api.get("/certificate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

export const createCertificateAdmin = (token: string, data: any) =>
  api.post("/certificate", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateCertificateAdmin = (token: string, id: string, data: any) =>
  api.patch(`/certificate/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteCertificateAdmin = (token: string, id: string) =>
  api.delete(`/certificate/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const uploadCertificatePdf = (token: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/certificate/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getNextCertificateNumberAdmin = (token: string) =>
  api.get("/certificate/next-number", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

