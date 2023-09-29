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
import DisplayComponents from "~/components/ DisplayComponents";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [showDisplayComponents, setShowDisplayComponents] = useState(false);
  const [addIndex, setAddIndex] = useState<number>();
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
  const { content, setContent, setDeleteBlock } = useContentStore();
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
  // const addBlock = () => {};
  return (
    <div className="">
      <button
        onClick={() => handleSave()}
        className="bg-green-300 rounded-xl text-white text-[18px] p-[8px_12px]">
        save
      </button>
      {content.map((item: object, index: number) => {
        const Component = components[item.ComponentName];
        // console.log(item.ComponentId, "item . compoennte");
        const propsForComponent = {
          ...item.props,
        };
        return (
          <div>
            <button
              className="bg-blue-400 rounded-xl text-white text-[18px] p-[5px_12px] mx-[20px]"
              onClick={() => swapup(index)}>
              up
            </button>
            <button
              className="bg-blue-400 rounded-xl text-white text-[18px] p-[5px_12px] mx-[20px]"
              onClick={() => swapdown(index)}>
              down
            </button>
            <button
              className="bg-blue-400 rounded-xl text-white text-[18px] p-[5px_12px] mx-[20px]"
              onClick={() => {
                setShowDisplayComponents(!showDisplayComponents);
                setAddIndex(index);
              }}>
              Add
            </button>
            <button
              className="bg-blue-400 rounded-xl text-white text-[18px] p-[5px_12px] mx-[20px]"
              onClick={() => {
                console.log("dleleted ", item.ComponentId);
                setDeleteBlock(item.ComponentId);
              }}>
              delete
            </button>
            <Component
              key={index}
              {...propsForComponent}
              showForm={true}
              ComponentId={item.ComponentId}
            />
          </div>
        );
      })}
      {showDisplayComponents && <DisplayComponents index={addIndex} />}
      {content.length === 0 && (
        <button
          className="bg-blue-400 rounded-xl text-white text-[18px] p-[5px_12px] mx-[20px]"
          onClick={() => {
            setShowDisplayComponents(!showDisplayComponents);
            setAddIndex(index);
          }}>
          Add
        </button>
      )}
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
