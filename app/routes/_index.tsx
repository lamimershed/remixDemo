import { redirect, type MetaFunction } from "@remix-run/node";
import Component2 from "~/components/Component2";
import Component3 from "~/components/Component3";
import { Component1 } from "~/components/Component1";
import { useState } from "react";
import { storeProductionData } from "~/services/getproducitonData";
import { useFetcher } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const fetcher = useFetcher();
  const [content, setContent] = useState([
    { item: <Component1 />, itemName: "Component1" },
    { item: <Component2 />, itemName: "Component2" },
    { item: <Component3 />, itemName: "Component3" },
  ]);
  const swapup = (index: number) => {
    console.log("==== index", content);
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
    console.log("submitValue ===== ", submitValue);
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
      {content.map((item: object, index: number) => (
        <div>
          <button onClick={() => swapup(index)}>up</button>
          {item.item}
          <button onClick={() => swapdown(index)}>down</button>
        </div>
      ))}
    </div>
  );
}

// backend

export async function action({ request }: any) {
  // const formData = await request.formData();
  // const data = { production: formData.get("production") };
  // const data = Object.fromEntries(formData);
  const data = await request.json();
  console.log("====data", data);

  storeProductionData(data.production);
  return redirect("/");
}
