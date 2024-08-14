import Navbar from "@/components/Navbar";
import Entrance from "@/components/User/Entrance";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="my-5 text-center">
        <Entrance />
      </div>
    </main>
  );
}
