import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Card, CardsResponse } from "../types"

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Cards'],
    endpoints: (builder) => ({
        getCards: builder.query<{ data: CardsResponse }, void>({
            query: () => 'cards',
            providesTags: (result) => result?.data ?
                [...result.data.map(({ id }) => ({ type: 'Cards', id } as const)), { type: 'Cards', id: 'LIST' }] :
                [{ type: 'Cards', id: 'LIST' }]
        }),
        addCard: builder.mutation<{ id: string }, { title: string, description: string, image: string | ArrayBuffer }>({
            query(body) {
                return { url: 'cards', method: 'POST', body }
            },
            invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
        }),
        getCard: builder.query<{ data: Card }, string>({
            query: (id) => `cards/${id}`,
            providesTags: (result, error, id) => [{ type: 'Cards', id }]
        }),
        updateCard: builder.mutation<Partial<Omit<Card, 'image'> & { image: string | ArrayBuffer }>, Partial<Omit<Card, 'image'> & { image: string | ArrayBuffer }>>({
            query(data) {
                const body = data
                return { url: `cards/${body.id}`, method: 'PATCH', body }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Cards', id }],
        }),
        deleteCard: builder.mutation<{ success: boolean, id: string }, string>({
            query(id) {
                return { url: `cards/${id}`, method: 'DELETE' }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Cards', id }]
        })
    }),
})

export const {
    useGetCardsQuery,
    useAddCardMutation,
    useGetCardQuery,
    useUpdateCardMutation,
    useDeleteCardMutation
} = cardsApi