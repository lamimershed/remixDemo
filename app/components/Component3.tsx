import { Link } from "@remix-run/react";

const Component3 = () => {
  return (
    <div id="Component3" className="h-[550px] bg-yellow-500 p-[100px] text-white flex justify-center items-center gap-[30px] flex-col">
      <h2 className="text-[44px] text-white font-semibold text-center">
        What is Lorem Ipsum?
      </h2>
      <p className="text-[24px] text-white font-semibold text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>
      <Link className="p-[10px_14px] bg-slate-600 text-white rounded-xl " to="/mykarehealth.com">click me!</Link>
    </div>
  );
};

export default Component3;
