import AddCard from "../components/AddCard"
import Cards from "../components/Cards"

export default function Home() {
    return (
        <main className="main-container">
            <Cards />
            <AddCard />
        </main>
    )
}