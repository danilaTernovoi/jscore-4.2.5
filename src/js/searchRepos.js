import { async } from "regenerator-runtime";

const API_URL = "https://api.github.com/search/repositories";
export const searchRepos = async (value) => {
  // q, per_page, page
  // name, owner, stargazers_count
  const raw = await fetch(`${API_URL}?per_page=5&q=${!!value ? value : ""}`);

  const json = await raw.json();
  return json.items;
};
