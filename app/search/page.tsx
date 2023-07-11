import { Metadata } from "next";
import SearchBar from "../components/SearchBar";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import { Cuisine, Location, PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: 'Search Restaurant - OpenTable',
  description: 'Some Description',
}

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: string;
  cuisine: Cuisine;
  location: Location;
}

const getRestaurantsByCity = async (city: string | undefined): Promise<RestaurantCardType[]> => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    price: true,
    cuisine: true,
    location: true,
  }

  if (!city) {
    return await prisma.restaurant.findMany({ select });
  }

  return await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase()
        }
      }
    },
    select,
  });
}

export default async function Search({ searchParams }: { searchParams: { city: string } }) {
  const restaurants = await getRestaurantsByCity(searchParams.city);

  return (
    <>
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <SearchBar />
      </div>

      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar />
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {
                restaurants.map(restaurant => (
                  <Card restaurant={restaurant} />
                ))
              }
            </>
          ) : <p>Sorry, we found no restaurants in this area</p>}
        </div>
      </div>
    </>
  );
}