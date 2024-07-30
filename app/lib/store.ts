import { addDoc, Firestore, getDocs } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { query, collection, where } from "firebase/firestore";

interface BaseStore {
    store: Firestore
}

type UserFields = {
    name: string,
    avatar: string,
}

type UserFieldsOpt = {
    name?: string,
    avatar?: string,
}

type ItemFields = {
    pid: string,
    name: string,
    quantity: number,
    category: number,   // TODO: Change to enum
    date_mod: string,
    img_url: string,
}

type ItemFieldsOpt = {
    name?: string,
    quantity?: number,
    category?: number,   // TODO: Change to enum
    date_mod?: string,
    img_url?: string,
}

async function fetchUserDoc(store: Firestore, uid: string) {
    return doc(store, '/users', uid);
}

async function fetchUserItems(store: Firestore, uid: string) {
    return collection(store, '/users', uid, 'products');
}

async function fetchUserItemDoc(store: Firestore, uid: string, pid: string) {
    return doc(store, '/users', uid, 'products', pid);
}

/** CRUD on Users 
 * 
 * These functions are ONLY meant to perform CRUD
 * operations on a user's fields.
*/
export class UserStore implements BaseStore {
    store: Firestore

    constructor(store: Firestore) {
        this.store = store;
    }

    async getUser(uid: string): Promise<UserFields | undefined> {
        const docRef = await fetchUserDoc(this.store, uid);
        const user = await getDoc(docRef);
        return user.data() as (UserFields | undefined);
    }

    async createUser(uid: string, dat: UserFields): Promise<void> {
        const docRef = await fetchUserDoc(this.store, uid);
        
        // TODO: Field Validation
        // TODO: Data Formatting

        setDoc(docRef, dat);
    }

    async updateUser(uid: string, dat: UserFieldsOpt): Promise<void> {
        const docRef = await fetchUserDoc(this.store, uid);

        // TODO: Field Validation
        // TODO: Data Formatting

        updateDoc(docRef, dat);
    }

    async deleteUser(uid: string): Promise<void> {
        const docRef = await fetchUserDoc(this.store, uid);
        deleteDoc(docRef);
    }
}

/** CRUD on Items 
 * 
 * These functions are ONLY meant to perform CRUD
 * operations on a user's fields.
*/
export class ItemStore implements BaseStore {
    store: Firestore
    
    constructor(store: Firestore) {
        this.store = store;
    }

    async getItem(uid: string, pid: string): Promise<ItemFields | undefined> {
        const docRef = await fetchUserItemDoc(this.store, uid, pid);
        const item = await getDoc(docRef);
        const dat = await item.data();

        return { pid: item.id, ...dat } as (ItemFields | undefined);
    }

    async getItems(uid: string) : Promise<ItemFields[]> {
        const collectRef = await fetchUserItems(this.store, uid);
        const qRef = query(collectRef);

        const itemRefs = await getDocs(qRef);
        const items = itemRefs.docs.map(snap => ({ pid: snap.id, ...snap.data() }))

        return items as ItemFields[];
    }

    // TODO: Batch querying
    async getItemsBy() {

    }

    async createItem(uid: string, dat: ItemFields) {
        const collectRef = await fetchUserItems(this.store, uid);

        // TODO: Field Validation
        // TODO: Data Formatting

        addDoc(collectRef, dat);
    }

    async updateItem(uid: string, pid: string, dat: ItemFieldsOpt) {
        const docRef = await fetchUserItemDoc(this.store, uid, pid);

        // TODO: Field Validation
        // TODO: Data Formatting

        updateDoc(docRef, dat);
    }

    async deleteItem(uid: string, pid: string) {
        const docRef = await fetchUserItemDoc(this.store, uid, pid);
        deleteDoc(docRef);
    }
}