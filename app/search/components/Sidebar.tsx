import { Cuisine, Location } from "@prisma/client";

interface Props {
  locations: Location[];
  cuisines: Cuisine[];
}

export default function Sidebar({ locations, cuisines }: Props) {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {
          locations.length ? (<>{ locations.map((location) => <p className="font-light text-reg capitalize" key={location.id}>{location.name}</p>) }</>) : 'No location available'
        }
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {
          cuisines.length ? (<>{ cuisines.map((cuisine) => <p className="font-light text-reg capitalize" key={cuisine.id}>{cuisine.name}</p>) }</>) : 'No cuisine available'
        }
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </button>
          <button
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </button>
        </div>
      </div>
    </div>
  );
}