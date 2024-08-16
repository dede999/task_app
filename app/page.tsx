import Navbar from "@/components/Navbar";
import TaskList from "@/components/Task/List";
import Entrance from "@/components/User/Entrance";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="my-5 text-center">
        <Entrance />
        <TaskList />
      </div>
    </main>
  );
}
