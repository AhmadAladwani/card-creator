'use client'

import { useState } from "react"
import { useAddCardMutation } from "../lib/redux/cards"
import Image from "next/image"

export default function AddCard() {
    const [addCard, result] = useAddCardMutation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)
    const [imageName, setImageName] = useState('')
    const [error, setError] = useState('')

    if (result.isLoading) {
        return (
            <div className="loader-container"><span className="loader"></span></div>
        )
    }

    function convertToBase64(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e)
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
            addCard({ title, description, image })
            setTitle('')
            setDescription('')
            setImage(null)
            setImageName('')
        } else {
            setError('Title, description and/or image values are not provided.')
        }
    }

    return (
        <>
            <form>
                {error && <p className="error">{error}</p>}
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="image" className="image-label">Select Image</label>
                <input type="file" accept="image/*" id="image" name="image" onChange={convertToBase64} required />
                {imageName && <p className="image-name">{imageName}</p>}
                {image && <div className="image-container"><Image src={image as string} alt="Image" sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 400px" fill style={{ objectFit: "contain" }} placeholder="empty" /></div>}
                <button className="submit-btn" type="button" onClick={handleSubmit}>Create Card</button>
            </form>
        </>
    )
}