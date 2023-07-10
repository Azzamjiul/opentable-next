import { Metadata } from "next";
import NavBar from "../components/NavBar";
import { PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";

export const metadata: Metadata = {
  title: 'Menu of Milesstone Grill - OpenTable',
  description: 'Some Description',
}

const prisma = new PrismaClient();

const fetchMenus = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    }
  })

  if (!restaurant) {
    throw new Error("");
  }

  return restaurant.items;
}

export default async function RestaurantMenu({ params }: { params: { slug: string } }) {
  const menus = await fetchMenus(params.slug);
  console.log(menus);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <NavBar slug={params.slug} />
        <Menu menus={menus} />
      </div>
    </>
  );
}