import Mock from 'mockjs';

// 气象数据模拟
Mock.mock('/api/weatherData', 'get', {
    code: 200,
    message: 'success',
    data: {
        'coordinates|1': [`${Mock.Random.float(20, 50, 6, 6)}, ${Mock.Random.float(70, 140, 6, 6)}`], // 经纬度
        'windLevel|1-5': 1, // 风力等级
        'windDescription|1': ['无风', '微风', '和风', '强风', '暴风'], // 风向描述
        'hourlyPrecipitation|0-100': 1, // 1小时累计降水量 (mm)
        'relativeHumidity|20-100': 1, // 相对湿度 (%)
        'cloudCoverage|0-100': 1, // 云量 (%)
        'cloudHeight|500-5000': 1, // 云层高度 (m)
        'visibility|100-10000': 1, // 能见度 (m)
        'pm25|0-200': 1, // PM2.5浓度 (μg/m³)
        'temperature|-10-40': 1, // 当前温度 (°C)
        'maxTemperature|0-40': 1, // 最高温度 (°C)
        'minTemperature|-10-30': 1 // 最低温度 (°C)
    }
});
