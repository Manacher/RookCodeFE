import * as echarts from "echarts";

interface UserHeatmapData {
    date: string;
    submit: number;
}

// 返回echarts渲染的数据表，最大的提交值，去年一共提交的次数以及去年提交的天数
export function processUserHeatmapData(list : UserHeatmapData[]) {
    const resData = [];
    let maxSubmit = 0;
    let submitCount = 0;
    const submitDay = list.length;
    const date2Submit = new Map<string, number>();

    list.forEach(val => {
        date2Submit.set(val.date, val.submit)
        submitCount += val.submit;
        maxSubmit = Math.max(maxSubmit, val.submit);
    })

    const today = Number(echarts.number.parseDate(new Date()));
    const dayTime = 3600 * 24 * 1000;
    const lastYearDay = today - dayTime * 364;
    for (let time = lastYearDay; time <= today; time += dayTime) {
        resData.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            date2Submit.get(echarts.format.formatTime('yyyy-MM-dd', time)) || 0
        ]);
    }

    return [resData, maxSubmit, submitCount, submitDay];
}