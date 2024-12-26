import CreateNoteBtn from "@/components/CreateNoteBtn"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Notes from "@/components/Notes"

const Home = () => {
  return (
    <div className="space-y-8 lg:w-[90%] w-full h-full lg:p-4 py-4 px-2">
      <Navbar />
      <Hero />
      <CreateNoteBtn />
      <Notes />
    </div>
  )
}

export default Home