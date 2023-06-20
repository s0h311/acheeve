<template>
  <div class="h-[95dvh] space-y-5">
    <h1 class="text-center text-lg font-semibold">{{ $t('diary') }}</h1>

    <div class="grid grid-cols-2 gap-5 h-[80px] md:h-1/12">
      <InputBtnTitled
        :title="$t('diary_gratitude')"
        :text="$t('diary_gratitude_text')"
        color="bg-[#647CB2]"
        @click="navigateTo('/en/addGratitude')"
      />
      <InputBtnTitled
        :title="$t('diary_anxiety')"
        :text="$t('diary_anxiety_text')"
        color="bg-[#E77899]"
        @click="navigateTo('/en/addAnxiety')"
      />
    </div>

    <hr class="w-full border-dark2" />

    <div class="entryList px-5 space-y-4 overflow-y-scroll hideScrollbar">
      <div
        v-for="(section, index) in entrySections"
        :key="index"
      >
        <DiaryEntry
          :entries="section"
          @onEntryClick="onEntryClick"
        />
        <hr class="w-full border-dark2 mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { DiaryData } from '~/types/types'

definePageMeta({
  layout: 'with-nav-bar',
  middleware: [], //'auth'
})

const l = useLocalePath()
const globalStore = useGlobalStore()
const diaryService = useDiaryService()
const entries = await diaryService?.getEntries()

const entrySections = computed<Array<DiaryData[]>>(() => {
  let sections: Array<DiaryData[]> = []
  let section = JSON.parse(JSON.stringify(entries)) // DEEP COPY, node 16 does not have structuredClone()

  let lastDate = new Date(new Date().toDateString()).getTime()

  if (section) {
    section
      .map((entry) => {
        return {
          ...entry,
          created_at: new Date(entry.created_at),
        }
      })
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .forEach((entry) => {
        let date = new Date(entry.created_at.getTime())
        date.setHours(0, 0, 0, 0)
        if (lastDate != date.getTime()) {
          lastDate = date.getTime()
          sections.push([])
        }
        if (sections.length == 0) {
          sections.push([])
        }
        sections.at(-1).push(entry)
      })
  }
  return sections
})

const onEntryClick = (entry: DiaryData) => {
  globalStore.setEditingEntry(entry)

  let type = entry.type

  if (type == 1) {
    navigateTo(l('/addDiaryEntry'))
  } else if (type == 2) {
    navigateTo(l('/addGratitude'))
  } else {
    navigateTo(l('/addAnxiety'))
  }
}
</script>
<style scoped>
.entryList {
  height: 45dvh;
}

@media (min-height: 600px) {
  .entryList {
    height: 60dvh;
  }
}

@media (min-height: 1000) {
  .entryList {
    height: 80dvh;
  }
}
</style>
