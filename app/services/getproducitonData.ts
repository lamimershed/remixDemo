import fs from "fs/promises";

export async function getProductionData() {
  //   console.log("======lamimershed")

  const rawFileContent = await fs.readFile("data/production.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  // console.log("======data", data)
  const production = data.production ?? [];
  return production;
}
export function storeProductionData(production: any) {
  return fs.writeFile(
    "data/production.json",
    JSON.stringify({ production: production || [] })
  );
}
