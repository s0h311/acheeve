<template>
  <div
    class="flex space-x-4 cursor-pointer"
    v-for="(entry, index) in entries"
    :key="entry.id"
    @click="emits('onEntryClick', entry)"
  >
    <div class="grid">
      <nuxt-img
        :src="`/icons/hub/diary_type${entry.type}.svg`"
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
