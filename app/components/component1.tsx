import { Form, useLoaderData } from "@remix-run/react";
import CtaComponents from "./cta-components/CtaComponents";
import { getProductionData } from "~/services/getproducitonData";

export const Component1 = ({ title }: any) => {
  const production1: string[] = useLoaderData();
  const component1Data = production1.find(obj => obj.itemName === "Component1");
  console.log("component1Data ======",component1Data)
  return (
    <>
      <div
        id="Component1
    "
        className="h-[550px] bg-red-500 text-white flex justify-center align-middle p-[40px] gap-[50px] "
      >
        <div className="w-[50%]">
          <img src="https://remix.run/docs-images/contacts/01.webp" alt="alt" />
        </div>
        <div className="w-[50%] flex flex-col justify-center gap-[70px]">
          <h2 className="text-[44px] text-white font-semibold">
            What is Lorem Ipsum?
          </h2>
          <p className="text-[24px] text-white font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
      </div>
      {true && (
        <Form method="post" id="note-form">
          {/* {data ? <p>{data.message}</p> : <></>} */}
          <p>
            <label htmlFor="imageUrl">Image Url</label>
            <input className="border-[1px] border-black" type="text" id="ImageUrl" name="ImageUrl" required />
          </p>
          <p>
            <label htmlFor="title">Title</label>
            <input className="border-[1px] border-black" type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="content">Content</label>
            <textarea className="border-[1px] border-black" id="content" name="content" rows={3} required />
          </p>
          <div className="form-actions">
            <button className="border-[3px] border-black">Add Note</button>
          </div>
        </Form>
      )}
    </>
  );
};
export async function loader() {
  const production = await getProductionData();
  console.log("produciton == ", Array.isArray(production));
  return production;
}