import { NextResponse } from "next/server"
import { deleteCard, getCard, updateCard } from "../../../../lib/firebase/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        const card = await getCard(id)
        return NextResponse.json({ data: card })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        const res = await request.json()
        const card = updateCard(res)
        return NextResponse.json({ card })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        await deleteCard(id)
        return NextResponse.json({ success: true, id })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, id })
    }
}