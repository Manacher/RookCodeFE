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

export interface DailyQuestionParam{
    start_date: string;
    end_date: string;
}

export async function getDailyQuestionList(params: DailyQuestionParam){
    let resp;
    await axios({
        method: 'get',
        url: '/daily',
        headers: {
            'Authorization': store.state.token,
        },
        params: params,
    }).then(res => {
        resp = res.data
    })
    return resp
}

export async function getFrontPageProgressData(){
    let resp;
    await axios({
        method: 'get',
        url: '/user/progress',
        params: {'account': store.state.account},
    }).then(res => {
        resp = res.data
    })
    return resp
}