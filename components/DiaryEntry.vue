<template>
  <div
    class="flex space-x-4 cursor-pointer"
    v-for="(entry, index) in entries"
    :key="entry.id"
    @click="emits('onEntryClick', entry)"
  >
    <div class="grid">
      <img
        :src="icon(entry.type)"
        :width="35"
      />
      <hr
        v-if="index != entries.length - 1"
        class="verticalLine w-[1px] h-12 place-self-center"
      />
    </div>
    <div class="space-y-2">
      <p class="text-xs leading-none">{{ entry.created_at?.toLocaleString().substring(0, 16) }}</p>
      <p class="text-md font-semibold leading-none">{{ entry.title }}</p>
      <p class="text-xs leading-none">{{ previewText(entry.content[0], entry.type) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DiaryData } from '~/types/types'

const props = defineProps({
  entries: { type: Array<DiaryData>, required: true },
})
const emits = defineEmits(['onEntryClick'])

const icon = (entryType: number): string => {
  return entryType == 1 ? '/icons/hub/diary_type1.svg' : entryType == 2 ? '/icons/hub/diary_type2.svg' : '/icons/hub/diary_type3.svg'
}

const previewText = (content: string, type: number) => {
  let text = type == 1 ? content.text : content.q1
  return text.length > 21 ? text.substring(0, 21) : text
}
</script>

<style scoped>
.verticalLine {
  border-left: 1px solid hsla(200, 10%, 50%, 100);
}
</style>
