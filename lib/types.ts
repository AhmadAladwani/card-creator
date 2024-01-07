export interface Card {
    id: string,
    title: string,
    description: string,
    image: string,
}

export type CardsResponse = Card[]