import axios from "axios";

export default async (perPage, currentPage) => {
  try {
    return await axios.get("https://api.github.com/gists/public", {
      params: {
        per_page: perPage,
        page: currentPage
      }
    });
  } catch (e) {
    throw e;
  }
};
