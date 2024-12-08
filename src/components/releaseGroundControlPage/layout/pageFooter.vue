<template>
    <div class="footer">
        <p>🚦&ensp;就绪：进港-{{ filteredArrivalEfps.length }}-出港-{{ filteredDepartureEfps.length }}-合计-{{
            filteredArrivalEfps.length + filteredDepartureEfps.length }}</p>
        <p>🍀&ensp;已移交：进港-{{ filteredTransferredArrivalEfps.length }}-出港-{{ filteredTransferredDepartureEfps.length }}-合计-{{
            filteredTransferredArrivalEfps.length + filteredTransferredDepartureEfps.length }}</p>
        <p>🚩&ensp;管制中：{{ processingData.length }}</p>
        <p>🚧&ensp;告警：0</p>
        <p style="background-color: rgba(155, 155, 155, 0.669);border-radius: 5px;color: rgb(255, 255, 255);font-size: smaller;padding: 2px;">放行地面页
        </p>
    </div>
</template>
<script setup lang="ts">
import { processingData, filteredArrivalEfps, filteredDepartureEfps, filteredTransferredArrivalEfps, filteredTransferredDepartureEfps } from "@/stores/releaseGroundEfps-store";


</script>
<style lang="scss" scoped>
.footer {
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    height: 27px;
    font-size: smaller;
    align-items: center;
    backdrop-filter: blur(15px);
}

.footer p {
    margin-left: 20px;
}
</style>