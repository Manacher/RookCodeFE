import axios from "axios";
import store from "@/store";

export async function getUserPageProgressData(account : string){
    let resp;
    await axios({
        method: 'get',
        url: '/user/progress',
        params: {'account': account},
    }).then(res => {
        resp = res.data
    })
    return resp
}