import axios from "axios/index";
import store from "@/store";

export async function likeOrUnlike(id: string) {
  let resp;
  await axios({
    method: "get",
    url: "/answer-like/LikeOrUnlikeAnswer/" + id,
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}
