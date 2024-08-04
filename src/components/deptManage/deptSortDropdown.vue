<template>
  <t-space>
    <t-dropdown :options="store.options" trigger="click" @click="store.clickHandler">
      <t-space>
        <t-button variant="text">
          {{ store.condition }}
          <template #suffix> <t-icon name="chevron-down" size="16" /></template>
        </t-button>
      </t-space>
    </t-dropdown>
  </t-space>
</template>

<script lang="ts" setup>
import { useDeptStore } from '@/stores/dept-store'

const store = useDeptStore()

</script>
