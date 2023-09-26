import { useLoaderData } from "@remix-run/react";
import { getProductionData } from "~/services/getproducitonData";

const production = () => {
  const production = useLoaderData();
  return <div>production
    {production.map((item: object, index: number) => (
          {item.item}
      ))}
  </div>;
};
export async function loader() {
  const production = await getProductionData();
  return production;
}
export default production;
