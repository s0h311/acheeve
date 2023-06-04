<template>
  <div>
    <p>this is the add diary page</p>
    <button @click="saveHabit">click me</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: '',
  middleware: ['auth'],
})

const diaryService = useDiaryService()

//TODO NUR ZUM TESTEN
const saveHabit = () => {
  diaryService.saveEntry({
    title: 'Test Entry',
    type: 3,
    content: [
      {
        question_1: 'Hallo?',
        answer: 'yoo',
      },
    ],
    pictures: [
      {
        image1: 'https://www.waipu.tv/app/uploads/2019/10/1-desktop.jpg',
      },
    ],
  })
}
</script>
