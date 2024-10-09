<template>
    <div class="wrap">
        <t-row>
            <t-col style="font-weight: bold;border-bottom: 5px solid blue;">飞行计划解析方式
            </t-col>
        </t-row>
        <t-row style="margin-top: 10px;background-color: aliceblue;padding: 10px;border-radius: 10px;" >
            <t-col :span="6">
                <t-row>a.从文件读取：</t-row>
                <t-row>
                    <t-upload action="https://service-yqzv8h0z-1257786608.gz.apigw.tencentcs.com/api/upload"
                        :on-success="handleSuccess" :on-error="handleError" :on-progress="handleProgress"
                        :on-change="handleChange" :on-remove="handleRemove" />
                </t-row>
                <t-row>
                    <t-button>解析</t-button>
                </t-row>
            </t-col>
            <t-col :span="3">
                <t-row>b.从接口读取：</t-row>
                <t-row>
                    <t-input v-model="url" placeholder="请输入接口地址" clearable />
                    <t-button>获取</t-button>
                </t-row>
            </t-col>
            <t-col :span="6">
                <t-row style="margin-top: 10px;">c.手动录入：</t-row>
                <t-row>
                    <t-button>录入</t-button>
                </t-row>
            </t-col>
        </t-row>

        <t-row style="margin-top: 10px;">

            <t-col style="font-weight: bold;border-bottom: 5px solid blue;">飞行计划解析结果
            </t-col>
            

        </t-row>
        <t-row>
                <t-table :columns="columns" :data="data" />
            </t-row>

        <t-row style="margin-top: 10px;">

            <t-col style="font-weight: bold;border-bottom: 5px solid blue;">飞行计划解析结果操作
            </t-col>
            
        </t-row>
        <t-row style="margin-top: 10px;">
                <t-button>分发给对应管制席</t-button>
                <t-button style="margin-left: 10px;" theme="danger">清空数据</t-button>
            </t-row>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 98%;
}
</style>