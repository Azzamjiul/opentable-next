import Description from "./components/Description";
import Header from "./components/Header";
import Images from "./components/Images";
import NavBar from "./components/NavBar";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

export default function RestaurantDetails() {
  return (
    <>
      <Header />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <NavBar />
          <Title />
          <Rating />
          <Description />
          <Images />
          <Reviews />
        </div>
        <ReservationCard />
      </div>
    </>
  );
}