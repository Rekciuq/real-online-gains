const BASE_URL = "http://localhost:3000";
const API = "api";
const API_VERSION = "v1";
const DATABASE = "database";

const BASE_ROUTE = `${BASE_URL}/${API}/${API_VERSION}/${DATABASE}`;

export const USERS_ROUTE = `${BASE_ROUTE}/users`;
export const ROLES_ROUTE = `${BASE_ROUTE}/roles`;
export const PERMISSIONS_ROUTE = `${BASE_ROUTE}/permissions`;
export const PERMISSION_TYPES_ROUTE = `${BASE_ROUTE}/permissions/types`;
