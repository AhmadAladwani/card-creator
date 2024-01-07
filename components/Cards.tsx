'use client'

import Image from "next/image"
import { useGetCardsQuery } from "../lib/redux/cards"
import Link from "next/link"

export default function Cards() {
    const { data, isLoading, isFetching } = useGetCardsQuery()
    const cards = data?.data

    if (isLoading || isFetching) {
        return (
            <div className="loader-container"><span className="loader"></span></div>
        )
    }

    return (
        <>
            {cards?.length ? <div className="card-container">
                {cards.map(card => {
                    return (
                        <Link href={`/cards/${card.id}`} key={card.id}>
                            <div className="card-item">
                                <div className="image-container-cards">
                                    <Image src={card.image} alt={card.image} sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px" fill style={{ objectFit: "contain" }} placeholder="empty" />
                                </div>
                                <h1>{card.title}</h1>
                            </div>
                        </Link>
                    )
                })}
            </div> : <h1>Empty cards</h1>}
        </>
    )
}