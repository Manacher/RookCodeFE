import axios from "axios";
import store from "@/store";

export interface ProblemListBody{
    difficulty: string;
    input: string;
    page: number;
    state: string;
    tag: string[];
}

export async function getProblemList(body: ProblemListBody){
    let resp;
    await axios({
        method: 'post',
        url: '/problem/list',
        headers: {
            'Authorization': store.state.token,
        },
        data: body,
    }).then(res => {
        resp = res.data
    })
    return resp
}