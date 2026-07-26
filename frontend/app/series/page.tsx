import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

export default function SeriesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-[#131314] text-[#e5e2e3] p-4">
                <h1 className="text-2xl font-bold mb-4">Series</h1>
                {/* Add your content for the Series page here */}
            </main>
            <Footer />
        </div>
    )
}