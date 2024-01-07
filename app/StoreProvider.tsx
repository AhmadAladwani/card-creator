'use client'

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react"
import { cardsApi } from "../lib/redux/cards"

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <ApiProvider api={cardsApi}>{children}</ApiProvider>
}