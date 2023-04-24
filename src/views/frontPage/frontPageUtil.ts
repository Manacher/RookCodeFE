export interface ProblemListReturnBody {
    difficulty: string,
    id: number,
    pass_rate: number,
    solution_num: number,
    state: string,
    title: string,
}

export interface ProblemListColumn {
    key: number,
    state: string,
    title: string,
    solution: number,
    pass: string,
    difficulty: string,
}


export function processProblemListData(problemList: ProblemListReturnBody[]): ProblemListColumn[] {
    const processRes: ProblemListColumn[] = []
    problemList.forEach((val) => {
        processRes.push({
            key: val.id,
            state: val.state,
            title: val.id + ". " + val.title,
            solution: val.solution_num,
            pass: val.pass_rate + "%",
            difficulty: val.difficulty,
        })
    });
    return processRes
}


export class FrontPageData {

    public static frontPageTreeData = [
        {
            name: '基本',
            value: '基本',
            selectable: false,
            children: [
                {
                    name: '数组', value: '数组',
                }, {
                    name: '字符串', value: '字符串',
                }, {
                    name: '排序', value: '排序',
                }, {
                    name: '模拟', value: '模拟',
                }, {
                    name: '矩阵', value: '矩阵',
                }, {
                    name: '枚举', value: '枚举',
                }, {
                    name: '字符串匹配', value: '字符串匹配',
                }, {
                    name: '桶排序', value: '桶排序',
                }, {
                    name: '计数排序', value: '计数排序',
                }, {
                    name: '基数排序', value: '基数排序',
                }],
        }, {
            name: '算法',
            value: '算法',
            selectable: false,
            children: [
                {
                    name: '动态规划', value: '动态规划',
                }, {
                    name: '深度优先搜索', value: '深度优先搜索',
                }, {
                    name: '贪心', value: '贪心',
                }, {
                    name: '广度优先搜索', value: '广度优先搜索',
                }, {
                    name: '二分查找', value: '二分查找',
                }, {
                    name: '回溯', value: '回溯',
                }, {
                    name: '递归', value: '递归',
                }, {
                    name: '分治', value: '分治',
                }, {
                    name: '记忆化搜索', value: '记忆化搜索',
                }, {
                    name: '归并排序', value: '归并排序',
                }, {
                    name: '快速选择', value: '快速选择',
                }],
        }, {
            name: '基础数据结构',
            value: '基础数据结构',
            selectable: false,
            children: [
                {
                    name: '哈希表', value: '哈希表',
                }, {
                    name: '树', value: '树',
                }, {
                    name: '二叉树', value: '二叉树',
                }, {
                    name: '栈', value: '栈',
                }, {
                    name: '堆', value: '堆',
                }, {
                    name: '图', value: '图',
                }, {
                    name: '链表', value: '链表',
                }, {
                    name: '有序集合', value: '有序集合',
                }, {
                    name: '单调栈', value: '单调栈',
                }, {
                    name: '队列', value: '队列',
                }, {
                    name: '拓扑排序', value: '拓扑排序',
                }, {
                    name: '最短路', value: '最短路',
                }, {
                    name: '单调队列', value: '单调队列',
                }, {
                    name: '双向链表', value: '双向链表',
                }, {
                    name: '最小生成树', value: '最小生成树',
                }, {
                    name: '欧拉回路', value: '欧拉回路',
                }, {
                    name: '双连通分量', value: '双连通分量',
                }, {
                    name: '强连通分量', value: '强连通分量',
                }],
        }, {
            name: '高级数据结构',
            value: '高级数据结构',
            selectable: false,
            children: [
                {
                    name: '并查集', value: '并查集',
                }, {
                    name: '字典树', value: '字典树',
                }, {
                    name: '线段树', value: '线段树',
                }, {
                    name: '树状数组', value: '树状数组',
                }, {
                    name: '后缀数组', value: '后缀数组',
                }],
        }, {
            name: '技巧',
            value: '技巧',
            selectable: false,
            children: [
                {
                    name: '双指针', value: '双指针',
                }, {
                    name: '位运算', value: '位运算',
                }, {
                    name: '前缀和', value: '前缀和',
                }, {
                    name: '计数', value: '计数',
                }, {
                    name: '滑动窗口', value: '滑动窗口',
                }, {
                    name: '状态压缩', value: '状态压缩',
                }, {
                    name: '哈希函数', value: '哈希函数',
                }, {
                    name: '滚动哈希', value: '滚动哈希',
                }, {
                    name: '扫描线', value: '扫描线',
                }],
        },

        {
            name: '数学',
            value: 'math',
            selectable: false,
            children: [
                {
                    name: '数学', value: '数学',
                }, {
                    name: '几何', value: '几何',
                }, {
                    name: '数论', value: '数论',
                }, {
                    name: '博弈', value: '博弈',
                }, {
                    name: '组合数学', value: '组合数学',
                }, {
                    name: '随机化', value: '随机化',
                }, {
                    name: '概率与统计', value: '概率与统计',
                }, {
                    name: '水塘抽样', value: '水塘抽样',
                }, {
                    name: '拒绝采样', value: '拒绝采样',
                }],
        }, {
            name: '其他',
            value: '其他',
            selectable: false,
            children: [
                {
                    name: '数据库', value: '数据库',
                }, {
                    name: '设计', value: '设计',
                }, {
                    name: '数据流', value: '数据流',
                }, {
                    name: '交互', value: '交互',
                }, {
                    name: '脑筋急转弯', value: '脑筋急转弯',
                }, {
                    name: '迭代器', value: '迭代器',
                }, {
                    name: '多线程', value: '多线程',
                }, {
                    name: 'shell', value: 'shell',
                }],
        }
    ]



}
