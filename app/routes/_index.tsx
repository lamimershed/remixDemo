import type { MetaFunction } from "@remix-run/node";
import Component2 from "~/components/Component2";
import Component3 from "~/components/Component3";
import { Component1 } from "~/components/Component1";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Component1 />
      <Component2 />
      <Component3 />
    </div>
  );
}
