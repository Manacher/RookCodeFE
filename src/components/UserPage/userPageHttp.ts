import axios from "axios";
import store from "@/store";

export async function getUserPageProgressData(account: string) {
  let resp;
  await axios({
    method: "get",
    url: "/user/progress",
    params: { account: account },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserPageDetail(account: string) {
  let resp;
  await axios({
    method: "post",
    url: "/user/detail",
    params: { account: account },
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export interface UserInfoUploadBody {
  avatar: string;
  nickname: string;
  description: string;
}

export async function uploadUserInfo(body: UserInfoUploadBody) {
  let resp;
  await axios({
    method: "post",
    url: "/user/update",
    data: body,
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserYearSubmit(account: string) {
  let resp;
  await axios({
    method: "get",
    url: "/user/year_submit",
    params: { account: account },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserRecentPassList(account: string, page: number) {
  let resp;
  await axios({
    method: "get",
    url: "/user/pass/list",
    params: { account: account, page: page },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserPublishList(account: string, page: number) {
  let resp;
  await axios({
    method: "get",
    url: "/user/solutionList",
    params: { account: account, page: page },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserFollowerList(pageNum: number, pageSize: number) {
  let resp;
  await axios({
    method: "get",
    url: "/follows/GetFollowerList/" + pageNum + "/" + pageSize,
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserFolloweeList(pageNum: number, pageSize: number) {
  let resp;
  await axios({
    method: "get",
    url: "/follows/GetFolloweeList/" + pageNum + "/" + pageSize,
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function getUserFollowerNum() {
  let resp;
  await axios({
    method: "get",
    url: "/follows/GetFolloweeAndFollowerCount",
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function followUser(account: string) {
  let resp;
  await axios({
    method: "post",
    url: "/follows/FollowOthers",
    data: { followerAccount: account },
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}

export async function unfollowUser(account: string) {
  let resp;
  await axios({
    method: "post",
    url: "/follows/UnFollowOthers",
    data: { followerAccount: account },
    headers: { Authorization: store.state.token },
  }).then((res) => {
    resp = res.data;
  });
  return resp;
}
