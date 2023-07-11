
import Header from './components/Header';
import Card from './components/Card';
import { Cuisine, Location, PrismaClient, Review } from '@prisma/client';

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  cuisine: Cuisine;
  location: Location;
  price: string;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    }
  });

  return restaurants;
}

export default async function Home() {
  const restaurants = await fetchRestaurant();
  console.log({ restaurants });
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify">
        {restaurants.map((restaurant) => (
          <Card restaurant={restaurant} />
        ))}
      </div>
    </main>
  )
}
