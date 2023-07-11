import { Metadata } from "next";
import Description from "./components/Description";
import Images from "./components/Images";
import NavBar from "./components/NavBar";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    }
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
};

export const metadata: Metadata = {
  title: 'Milesstone Grill - OpenTable',
  description: 'Some Description',
}

export default async function RestaurantDetails({ params }: { params: { slug: string } }) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  console.log(restaurant);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <NavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <ReservationCard />
    </>
  );
}