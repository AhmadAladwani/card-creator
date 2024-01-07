'use client'

import { useDeleteCardMutation, useUpdateCardMutation } from "@/lib/redux/cards"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Card } from "../lib/types"

export default function EditCard({ card, setLoadingCard }: { card: Card, setLoadingCard: () => void }) {
    const [updateCard, updateResult] = useUpdateCardMutation()
    const [deleteCard, deleteResult] = useDeleteCardMutation()
    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description)
    const [image, setImage] = useState<string | ArrayBuffer | null>(card.image)
    const [imageName, setImageName] = useState('')
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (updateResult.isSuccess) {
            setLoadingCard()
        }
    }, [updateResult.isSuccess])

    if (updateResult.isLoading || deleteResult.isLoading || loadingEdit) {
        return (
            <div className="loader-container"><span className="loader"></span></div>
        )
    }

    function convertToBase64(e: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader()
        if (e.target.files && e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            setImageName(e.target.files[0].name)
        }
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: " + error)
        }
        if (!e.target.files || !e.target.files[0]) {
            setImage(null)
            setImageName('')
        }
    }

    function handleSubmit() {
        if (title && description && image) {
            updateCard({ id: card.id, title, description, image })
        } else {
            setError('Title, description and/or image values are not provided.')
        }
    }

    function handleDelete() {
        setLoadingEdit(true)
        deleteCard(card.id)
        setTimeout(() => router.replace('/'), 1000)
    }

    return (
        <form>
            {error && <p className="error">{error}</p>}
            <label htmlFor="title">Change Title:</label>
            <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="description">Change Description:</label>
            <textarea id="description" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor="image" className="image-label">Update Image</label>
            <input type="file" accept="image/*" id="image" name="image" onChange={convertToBase64} required />
            {imageName && <p className="image-name">{imageName}</p>}
            {image && <div className="image-container"><Image src={image as string} alt="Image" sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 400px" fill style={{ objectFit: "contain" }} placeholder="empty" /></div>}
            <button className="submit-btn" type="button" onClick={handleSubmit}>Update Card</button>
            <button className="delete-btn" type="button" onClick={handleDelete}>Delete Card</button>
        </form>
    )
}