import { Metadata } from "next";
import NavBar from "../components/NavBar";
import MenuCard from "./components/MenuCard";

export const metadata: Metadata = {
  title: 'Menu of Milesstone Grill - OpenTable',
  description: 'Some Description',
}

export default function RestaurantMenu() {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <NavBar />
        <main className="bg-white mt-5">
          <div>
            <div className="mt-4 pb-1 mb-1">
              <h1 className="font-bold text-4xl">Menu</h1>
            </div>
            <div className="flex flex-wrap justify-between">
              <MenuCard />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}