import type { Auth, UserCredential } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function signIn(auth: Auth): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}

export async function signOut(auth: Auth) {
    auth.signOut();
}