import { NextResponse } from "next/server"
import { addCard, getCards } from "../../../lib/firebase/api"

export async function GET() {
    try {
        const cards = await getCards()
        return NextResponse.json({ data: cards })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}

export async function POST(request: Request) {
    try {
        const res = await request.json()
        const id = await addCard(res)
        return NextResponse.json({ id })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}