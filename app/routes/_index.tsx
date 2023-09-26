import type { MetaFunction } from "@remix-run/node";
import Component2 from "~/components/Component2";
import Component3 from "~/components/Component3";
import { Component1 } from "~/components/Component1";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
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

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {content.map((item: object, index: number) => (
        <div>
          <button onClick={() => swapup(index)}>up</button>
          {item.item}
          <button onClick={() => swapdown(index)}>down</button>
        </div>
      ))}
      <button className="bg-green-300 rounded-xl text-white text-[18px]">
        save
      </button>
    </div>
  );
}
