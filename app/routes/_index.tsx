import { redirect, type MetaFunction } from "@remix-run/node";
import Component2 from "~/components/Component2";
import Component3 from "~/components/Component3";
import { Component1 } from "~/components/Component1";
import { useEffect, useState } from "react";
import {
  getProductionData,
  storeProductionData,
} from "~/services/getproducitonData";
import { useFetcher, useLoaderData } from "@remix-run/react";
import useContentStore from "data/store";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const production1: object[] = useLoaderData();
  const components = {
    Component1: Component1,
    Component3: Component3,
    Component2: Component2,
  };
  const fetcher = useFetcher();
  useEffect(() => {
    setContent(production1);
  }, []);
  const { content, setContent } = useContentStore();
  // const [content, setContent] = useState(production1);
  const swapup = (index: number) => {
    // console.log("==== index", content);
    const newBlock = [...content];
    if (index > 0) {
      let temp = newBlock[index];
      newBlock[index] = newBlock[index - 1];
      newBlock[index - 1] = temp;
      setContent(newBlock);
    }
  };
  const swapdown = (index: number) => {
    const newBlock = [...content];
    if (index < newBlock.length - 1) {
      let temp = newBlock[index];
      newBlock[index] = newBlock[index + 1];
      newBlock[index + 1] = temp;
      setContent(newBlock);
    }
  };
  const handleSave = () => {
    const lami: string[] = [];
    content.forEach((element) => {
      lami.push(element.itemName);
    });
    const submitValue = JSON.stringify({ production: [...content] });
    // console.log("submitValue ===== ", submitValue);
    fetcher.submit(JSON.stringify({ production: [...content] }), {
      method: "POST",
      encType: "application/json",
    });
  };

  return (
    <div>
      <button
        onClick={() => handleSave()}
        className="bg-green-300 rounded-xl text-white text-[18px]">
        save
      </button>
      {content.map((item: object, index: number) => {
        const Component = components[item.ComponentName];
        const propsForComponent = {
          ...item.props,
        };
        return (
          <div>
            <button onClick={() => swapup(index)}>up</button>
            <Component key={index} {...propsForComponent} showForm={true} />
            <button onClick={() => swapdown(index)}>down</button>
          </div>
        );
      })}
    </div>
  );
}

// backend

export async function action({ request }: any) {
  // const formData = await request.formData();
  // const data = { production: formData.get("production") };
  // const data = Object.fromEntries(formData);
  const data = await request.json();
  // console.log("====data", data);

  storeProductionData(data.production);
  return redirect("/");
}
export async function loader() {
  const production = await getProductionData();
  // console.log("produciton == ", Array.isArray(production));
  return production;
}
