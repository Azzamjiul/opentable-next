import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";

export default function Search() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />

        <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
          <SearchBar />
        </div>

        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          
          {/* SEARCH SIDE BAR */}
          <Sidebar/>

          <div className="w-5/6">
            <Card/>
          </div>
        </div>
      </main>
    </main>
  );
}