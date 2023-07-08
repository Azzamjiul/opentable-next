import { Metadata } from "next";
import Description from "./components/Description";
import Images from "./components/Images";
import NavBar from "./components/NavBar";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

export const metadata: Metadata = {
  title: 'Milesstone Grill - OpenTable',
  description: 'Some Description',
}

export default function RestaurantDetails() {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <NavBar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <ReservationCard />
    </>
  );
}