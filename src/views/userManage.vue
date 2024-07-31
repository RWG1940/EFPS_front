<template>
    <div class="wrap">
        <div class="search">
            <userSort />
            <t-input placeholder="搜索用户" clearable style="width: 15%;"></t-input>
            <t-button theme="default"><template #icon><search-icon /></template>
            </t-button>
            <div class="operations">
                <t-button theme="primary" @click="addButton">
                    <template #icon><add-icon /></template>
                    新增
                </t-button>
                <t-button><template #icon><delete-icon /></template>
                    批量删除</t-button>
            </div>
        </div>
        <div class="table">
            <userTable v-model:addVisible="addVisible" @update:addVisible="handleUpdateAddVisible"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import userSort from '../components/userManage/userSortDropdown.vue'
import  userTable from '../components/userManage/userTable.vue'
import { ref } from "vue";

const addVisible = ref(false)
const addButton = () =>{
    addVisible.value=true
}
const handleUpdateAddVisible = () => {
  addVisible.value = false;
};
</script>
<style lang="scss" scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 2%;
    height: 98%;
    width: 93%; 
    
}

.search {
    display: flex;
}

.operations {
    margin-left: auto;
    display: flex;
    gap: 10px;
}
.table {  
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
