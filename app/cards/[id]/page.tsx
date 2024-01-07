import SingleCard from "../../../components/SingleCard";

export default function Card({ params }: { params: { id: string } }) {
    return (
        <div>
            <SingleCard id={params.id} />
        </div>
    )
}