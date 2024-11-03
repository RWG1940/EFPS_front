import Mock from 'mockjs'

// 高空空域信息
Mock.mock('/api/airspaceInfo', 'get', {
    code: 200,
    message: 'success',
    data: {
        'flow|1': ['低', '中', '高'],
        'quantity|1-100': 1,
        'alertMess|0-10': 1,
        'windSpeed|5-20': 1,
        'windDirection|0-360': 1,
        'visibility|1-10': 1,
        'ceiling|500-5000': 1
    }
})
