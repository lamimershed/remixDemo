import { useLoaderData } from "@remix-run/react";
import { getProductionData } from "~/services/getproducitonData";
import Component2 from "~/components/Component2";
import Component3 from "~/components/Component3";
import { Component1 } from "~/components/Component1";

const Production = () => {
  const components = {
    Component1: Component1,
    Component3: Component3,
    Component2: Component2,
  };
  const production1: string[] = useLoaderData();
  // console.log("produciton1 === ", production1);
  return (
    <div>
      production
      {production1.map((item: string, index: number) => {
        const Component = components[item.ComponentName];
        const propsForComponent = {
          ...item.props,
        };
        return <Component key={index} {...propsForComponent} />;
      })}
    </div>
  );
};
export async function loader() {
  const production = await getProductionData();
  // console.log("produciton == ", Array.isArray(production));
  return production;
}
export default Production;
