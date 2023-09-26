import fs from "fs/promises";

export async function getProductionData() {
  const rawFileContent = await fs.readFile("../../data/production.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const production = data.production ?? [];
  return production;
}
export function storeProductionData(notes: any) {
  return fs.writeFile("../../data/production.json", JSON.stringify({ notes: notes || [] }));
}