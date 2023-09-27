export const Component1 = ({ title }: any) => {
  return (
    <div
      id="Component1
    "
      className="h-[300px] bg-red-500 text-white">
      {title ?? "Component1"}
    </div>
  );
};
