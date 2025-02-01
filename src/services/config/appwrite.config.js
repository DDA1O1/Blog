import { Client, Databases, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint(String(import.meta.env.VITE_APPWRITE_ENDPOINT))
    .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

export const databases = new Databases(client);
export const account = new Account(client);
