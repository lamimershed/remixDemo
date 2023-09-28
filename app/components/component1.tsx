import { Form, useLoaderData } from "@remix-run/react";
import CtaComponents from "./cta-components/CtaComponents";
import { getProductionData } from "~/services/getproducitonData";
import useContentStore from "data/store";
import useTextInput from "useHooks/useTextInput";

export const Component1 = (props: any) => {
  const { setBlockData } = useContentStore();
  const production1: string[] = useLoaderData();
  const component1Data = production1.find(
    (obj) => obj?.ComponentName === "Component1"
  );
  const component1Index = production1.findIndex(
    (obj) => obj?.ComponentName === "Component1"
  );
  // console.log("component1Data ======", component1Data);

  const titleHook = useTextInput(component1Data?.props?.title);
  const imageUrlHook = useTextInput(component1Data?.props?.imageUrl);
  const contentHook = useTextInput(component1Data?.props?.content);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hlo la;mi==================");
    const newprops = {
      title: titleHook.value,
      imageUrl: imageUrlHook.value,
      content: contentHook.value,
    };
    const newData = {
      ...component1Data,
      props: newprops,
    };
    console.log("newData ======", newData);

    setBlockData(component1Index, newData);
  };
  return (
    <>
      <div
        id="Component1
    "
        className=" bg-red-500 text-white flex justify-center align-middle p-[40px] gap-[50px] ">
        <div className="w-[50%]">
          <img
            className="object-cover w-full "
            src={props.imageUrl}
            alt="alt"
          />
        </div>
        <div className="w-[50%] flex flex-col justify-center gap-[70px]">
          <h2 className="text-[44px] text-white font-semibold">
            {props.title}
          </h2>
          <p className="text-[24px] text-white font-semibold">
            {props.content}
          </p>
        </div>
      </div>
      {props.showForm && (
        <form
          // onSubmit={(e) => handleSubmit(e)}
          id="note-form">
          {/* {data ? <p>{data.message}</p> : <></>} */}
          <p>
            <label htmlFor="title">Title</label>
            <input
              className="border-[1px] border-black"
              // defaultValue={component1Data?.props?.title}
              value={titleHook.value}
              onChange={titleHook.onChange}
              type="text"
              id="title"
              name="title"
              required
            />
          </p>
          <p>
            <label htmlFor="imageUrl">Image Url</label>
            <input
              className="border-[1px] border-black"
              // defaultValue={component1Data?.props?.imageUrl}
              value={imageUrlHook.value}
              onChange={imageUrlHook.onChange}
              type="text"
              id="ImageUrl"
              name="ImageUrl"
              required
            />
          </p>
          <p>
            <label htmlFor="content">Content</label>
            <textarea
              className="border-[1px] border-black"
              // defaultValue={component1Data?.props?.content}
              value={contentHook.value}
              onChange={contentHook.onChange}
              id="content"
              name="content"
              rows={3}
              required
            />
          </p>
          <div className="form-actions">
            <button
              onClick={(e) => handleSubmit(e)}
              className="border-[3px] border-black">
              Add Note
            </button>
          </div>
        </form>
      )}
    </>
  );
};
export async function loader() {
  const production = await getProductionData();
  // console.log("produciton == ", Array.isArray(production));
  console.log("component 1 ====", production);
  return production;
}
