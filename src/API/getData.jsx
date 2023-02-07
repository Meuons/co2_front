import axios from "axios";

export function getData(url, callback) {
  axios
    .get(url)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}
