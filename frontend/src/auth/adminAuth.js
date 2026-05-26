// src/auth/adminAuth.js
let isAdmin = false;

export const loginAdmin = (email, password) => {
  if (email === "admin" && password === "admin") {
    isAdmin = true;
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  isAdmin = false;
};

export const getAdminStatus = () => isAdmin;