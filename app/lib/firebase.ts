import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import CONFIG from './config.json';

const app = initializeApp(CONFIG);

export function getStore() {
    return getFirestore(app);
}