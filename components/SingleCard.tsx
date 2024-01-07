'use client'

import Image from "next/image"
import { useGetCardQuery } from "../lib/redux/cards"
import EditCard from "./EditCard"
import { useEffect, useState } from "react"

export default function SingleCard({ id }: { id: string }) {
    const { data, isLoading } = useGetCardQuery(id)
    const card = data?.data
    const [loadingCard, setLoadingCard] = useState(false)

    useEffect(() => {
        if (loadingCard) {
            const timeoutId = setTimeout(() => window.location.reload(), 1000)

            return () => {
                clearTimeout(timeoutId)
                setLoadingCard(false)
            }
        }
    }, [loadingCard])

    if (isLoading || loadingCard) {
        return (
            <div className="loader-container"><span className="loader"></span></div>
        )
    }

    return (
        <div className="edit-container">
            {card && <>
                <div className="single-card">
                    <div className="image-container">
                        <Image src={card.image} alt={card.image} sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 400px" fill style={{ objectFit: "contain" }} placeholder="empty" />
                    </div>
                    <h1 className="single-card-title">{card.title}</h1>
                    <h2>{card.description}</h2>
                </div>
                <EditCard card={card} setLoadingCard={() => setLoadingCard((prev) => !prev)} />
            </>}
        </div>
    )
}