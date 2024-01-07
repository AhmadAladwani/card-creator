import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "./config"
import { deleteObject, getDownloadURL, listAll, ref, uploadString } from "firebase/storage"
import type { Card } from "../types"

export async function getCards(): Promise<Card[]> {
    try {
        const q = query(collection(db, 'cards'), orderBy('updatedAt', 'asc'))
        const cardsDocs = (await getDocs(q)).docs
        const listRef = ref(storage)
        const images = await listAll(listRef)
        const imagesItems = images.items
        imagesItems.forEach(item => item)
        const cards: Card[] = []
        for (let i = 0; i < cardsDocs.length; i++) {
            const id = cardsDocs[i].id
            const title = cardsDocs[i].data().title
            const description = cardsDocs[i].data().description
            const cardImage = imagesItems.find((item) => item.name === id)
            if (!cardImage) {
                throw 'No card image found.'
            }
            const imageUrl = await getDownloadURL(cardImage)
            cards.push({ id, title, description, image: imageUrl })
        }
        return cards
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getCard(id: string): Promise<Card> {
    try {
        const docRef = doc(db, 'cards', id)
        const cardDoc = await getDoc(docRef)
        const cardImageRef = ref(storage, cardDoc.id)
        const imageUrl = await getDownloadURL(cardImageRef)
        const title = cardDoc.data()?.title
        const description = cardDoc.data()?.description
        return { id, title, description, image: imageUrl }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function addCard({ title, description, image }: { title: string, description: string, image: string }): Promise<string> {
    try {
        const cardRef = await addDoc(collection(db, 'cards'), { title, description, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
        const cardImageRef = ref(storage, cardRef.id)
        await uploadString(cardImageRef, image, 'data_url')
        return cardRef.id
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateCard(card: Partial<Omit<Card, 'image'> & { image: string | ArrayBuffer }>): Promise<Partial<Omit<Card, 'image'> & { image: string | ArrayBuffer }>> {
    if (card.id) {
        const id = card.id
        try {
            if ((card.title && card.description) || card.title || card.description) {
                const docRef = doc(db, 'cards', id)
                if (card.title && card.description) {
                    await updateDoc(docRef, { title: card.title, description: card.description, updatedAt: serverTimestamp() })
                } else if (card.title) {
                    await updateDoc(docRef, { title: card.title, updatedAt: serverTimestamp() })
                } else if (card.description) {
                    await updateDoc(docRef, { description: card.description, updatedAt: serverTimestamp() })
                }
            }
            if (card.image) {
                const cardImageRef = ref(storage, card.id)
                await uploadString(cardImageRef, card.image as string, 'data_url')
            }
            return { ...card }
        } catch (error) {
            console.log(error)
            throw error
        }
    } else {
        throw 'No id is found.'
    }
}

export async function deleteCard(id: string): Promise<string> {
    try {
        const docRef = doc(db, 'cards', id)
        await deleteDoc(docRef)
        const cardImageRef = ref(storage, id)
        await deleteObject(cardImageRef)
        return docRef.id
    } catch (error) {
        console.log(error)
        throw error
    }
}