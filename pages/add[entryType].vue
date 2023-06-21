<template>
  <div
    :class="bgColor"
    class="responsive-w-window mx-auto p-7"
  >
    <div class="h-[95dvh] relative space-y-6">
      <div class="flex items-center justify-center relative">
        <BtnWithImg
          class="absolute left-0"
          imageUrl="/icons/cancel-btn.png"
          :width="20"
          :height="20"
          @onClick="onCancel"
        />
        <h1 class="text-lg font-semibold leading-none">{{ $t('diary_' + entryType) }}</h1>
        <BtnWithImg
          v-if="editingEntry"
          class="absolute right-0"
          imageUrl="/icons/delete-btn.png"
          :name="$t('delete_entry')"
          :width="20"
          @onClick="onDelete"
        />
      </div>
      <p class="font-semibold">{{ $t(questions[currentIndex].question) }}</p>
      <textarea
        class="bg-transparent w-full outline-none resize-none"
        :placeholder="$t('placeholder_diary_text')"
        maxlength="1000"
        v-model="diaryData.content[0]['q' + (currentIndex + 1)]"
      />
      <p class="absolute left-0 bottom-5">{{ questionStateText }}</p>
      <div class="flex space-x-4 absolute right-0 bottom-2">
        <BtnWithImg
          imageUrl="/icons/arrow_back_btn.png"
          :width="35"
          @onClick="back"
        />
        <BtnWithImg
          v-if="currentIndex + 1 != questions.length"
          imageUrl="/icons/arrow_forward_btn.png"
          :width="35"
          @onClick="forward"
        />
        <BtnWithImg
          v-else
          imageUrl="/icons/checked_btn.png"
          :width="35"
          @onClick="onSave"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DiaryData } from '~/types/types'
import { useGlobalStore } from '~/stores/global'

definePageMeta({
  layout: false,
  middleware: ['auth'],
})

const l = useLocalePath()
const { t } = useI18n()
const diaryService = useDiaryService()
const route = useRoute()
const globalStore = useGlobalStore()

const editingEntry = computed(() => globalStore.editingEntry)
const entryType = computed<string>(() => route.params.entryType.toLowerCase())
const bgColor = computed<string>(() => (entryType.value == 'gratitude' ? 'bg-[#647CB2]' : 'bg-[#E77899]'))
const currentIndex = ref<number>(0)

onBeforeMount(() => {
  if (entryType.value !== 'gratitude' && entryType.value !== 'anxiety') {
    throw createError({ statusCode: 400, statusMessage: 'Page not found' })
  }

  if (editingEntry.value) {
    diaryData.value.type = editingEntry.value.type
    diaryData.value.content = editingEntry.value.content
  }
})

const diaryData = ref<DiaryData>({
  title: entryType.value.charAt(0).toUpperCase() + entryType.value.substring(1),
  type: entryType.value == 'gratitude' ? 2 : 3,
  content: [
    {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
    },
  ],
})

const questions = ref([
  {
    id: 1,
    question: entryType.value + '.question1',
  },
  {
    id: 2,
    question: entryType.value + '.question2',
  },
  {
    id: 3,
    question: entryType.value + '.question3',
  },
  {
    id: 4,
    question: entryType.value + '.question4',
  },
])

const questionStateText = computed<string>(() => {
  return t('question') + ' ' + (currentIndex.value + 1) + ' ' + t('of') + ' ' + questions.value.length
})

const onCancel = () => {
  globalStore.setEditingEntry(null)
  navigateTo(l('/diary'))
}

const onSave = async () => {
  if (editingEntry.value != null) {
    await diaryService?.updateEntry(editingEntry.value.id, diaryData.value)
  } else {
    await diaryService?.saveEntry(diaryData.value)
  }
  globalStore.setEditingEntry(null)
  navigateTo(l('/diary'))
}

const onDelete = async () => {
  await diaryService?.deleteEntry(editingEntry.value?.id, null)
  globalStore.setEditingEntry(null)
  navigateTo(l('/diary'))
}

const back = () => {
  currentIndex.value -= currentIndex.value > 0 ? 1 : 0
}

const forward = () => {
  currentIndex.value += currentIndex.value + 1 < questions.value.length ? 1 : questions.value.length
}
</script>

<style scoped>
textarea {
  height: 60dvh;
}

@media (min-height: 600px) {
  textarea {
    height: 70dvh;
  }
}

@media (min-height: 1000) {
  textarea {
    height: 90dvh;
  }
}
</style>
