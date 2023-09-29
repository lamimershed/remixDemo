import { defaultBlocksArray } from "data/defaultData";
import useContentStore from "data/store";

const DisplayComponents = ({ index }: any) => {
  const { setNewBlock } = useContentStore();

  return (
    <div className=" flex flex-wrap max-w-[550px] max-h-[400px] fixed translate-x-[-50%] translate-y-[-50%] p-[20px] shadow-2xl top-[50%] left-[50%] bg-white z-10 rounded-xl">
      <div className="w-[550px] flex justify-end">
        <div className="p-[10px] text-white bg-green-300 rounded-full m-auto">
          {index}
        </div>
      </div>
      {defaultBlocksArray?.map((item) => (
        <button
          onClick={() => setNewBlock(index, item)}
          className=" text-white text-[18px] p-[5px_12px] m-[8px] bg-gray-700 rounded-md">
          {item.ComponentName}
        </button>
      ))}
    </div>
  );
};

export default DisplayComponents;
