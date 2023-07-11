import { Metadata } from "next";
import SearchBar from "../components/SearchBar";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";

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
  reviews: Review[];
}

interface SearchParams { city?: string, cuisine?: string, price?: PRICE };

const getRestaurants = async (searchParams: SearchParams): Promise<RestaurantCardType[]> => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      }
    }

    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      }
    }

    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    }

    where.price = price;
  }

  console.log('searchParams', searchParams);
  console.log('where', where);

  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    price: true,
    cuisine: true,
    location: true,
    reviews: true,
  }

  return await prisma.restaurant.findMany({
    where,
    select,
  });
}

const fetchLocations = async () => {
  return await prisma.location.findMany();
}

const fetchCuisines = async () => {
  return await prisma.cuisine.findMany();
}

export default async function Search({ searchParams }: { searchParams: SearchParams }) {
  const restaurants = await getRestaurants(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <SearchBar />
      </div>

      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar locations={locations} cuisines={cuisines} searchParams={searchParams} />
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