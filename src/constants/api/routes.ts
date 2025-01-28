const BASE_URL = "http://localhost:3000";
const API = "api";
const API_VERSION = "v1";
const DATABASE = "database";

const BASE_ROUTE = `${BASE_URL}/${API}/${API_VERSION}/${DATABASE}`;

export const UPLOAD_IMAGE_API_ROUTE = `${BASE_ROUTE}/upload-from-url`;
export const IMAGES_API_ROUTE = `${BASE_ROUTE}/images`;
export const CHATS_API_ROUTE = `${BASE_ROUTE}/chats`;
export const USERS_API_ROUTE = `${BASE_ROUTE}/users`;
export const SESSION_API_ROUTE = `${BASE_ROUTE}/session`;
export const ROLES_API_ROUTE = `${BASE_ROUTE}/roles`;
export const PERMISSIONS_API_ROUTE = `${BASE_ROUTE}/permissions`;
export const PERMISSION_TYPES_API_ROUTE = `${BASE_ROUTE}/permissions/types`;
