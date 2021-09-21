import axios from "axios";

const URL = "https://pixabay.com/api/";
const API_KEY = "22788715-8437fcb04a405122d442af916";

axios.defaults.baseURL = URL;
axios.defaults.params = {
  key: API_KEY,
  per_page: 12,
  image_type: "photo",
  orientation: "horizontal",
};

const fetchData = async (state) => {
  const { query, page } = state;

  return await axios("", {
    params: { q: query, page },
  });
};

export default fetchData;

// Your API key: 22788715-8437fcb04a405122d442af916
