import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-[#131314] text-[#e5e2e3] p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {/* Add your content for the Profile page here */}
      </main>
      <Footer />
    </div>
  )
}