<template>
  <div class="h-[95dvh] relative space-y-6">
    <div class="grid grid-flow-col mb-2">
      <BtnWithImg
        imageUrl="/icons/cancel-btn.png"
        :width="20"
        :height="20"
        @onClick="onCancel"
      />
      <button
        class="place-self-end"
        @click="handleSave"
      >
        {{ $t('save') }}
      </button>
    </div>
    <input
      class="bg-transparent w-full outline-none"
      :placeholder="$t('placeholder_diary_title')"
      v-model="title"
    />
    <textarea
      class="bg-transparent h-[65dvh] w-full outline-none"
      :placeholder="$t('placeholder_diary_text')"
      maxlength="1000"
      v-model="text"
    />
    <div class="flex space-x-2 overflow-x-scroll hideScrollbar">
      <img
        v-for="(preview, index) in previews"
        class="h-12"
        :key="index"
        :src="preview"
        @click="showPreview(index)"
      />
    </div>
    <BtnWithImg
      class="absolute left-0 bottom-0"
      imageUrl="/icons/camera.png"
      :name="$t('upload_image')"
      :height="24"
      :width="28"
      @onClick="handleImage"
    />
    <BtnWithImg
      v-if="editingEntry"
      class="absolute right-0 bottom-0"
      imageUrl="/icons/delete-btn.png"
      :name="$t('delete_entry')"
      :width="20"
      @onClick="deleteEntry"
    />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'

const l = useLocalePath()
const supabase = useSupabaseClient()
const diaryService = useDiaryService()
const globalStore = useGlobalStore()
const editingEntry = computed(() => globalStore.editingEntry)

onBeforeMount(() => {
  if (editingEntry.value) {
    title.value = editingEntry.value.title
    text.value = editingEntry.value.content[0].text
    oldImages.value = editingEntry.value.pictures

    let imageUrls = editingEntry.value.pictures.map(
      (image) => 'https://rpoeffpbbnljlyhptgks.supabase.co' + '/storage/v1/object/public/diary_pictures/' + image
    )

    previews.value = imageUrls
  }
})

const title = ref('')
const text = ref('')
const images = ref<[]>([])
const oldImages = ref<[]>([])
const previews = ref<object | []>([])

const handleImage = () => {
  if (images.value.length + oldImages.value.length <= 4) {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = (event) => {
      const input = event.target

      if (input.files) {
        const reader = new FileReader()
        reader.onload = (e) => {
          previews.value.push(e.target.result)
        }
        images.value.push(input.files[0])
        reader.readAsDataURL(input.files[0])
      }
    }

    fileInput.click()
  } else {
    // TODO display error
  }
}

const generateUniqueFileName = (fileName) => {
  const timestamp = new Date().getTime()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = fileName.split('.').pop()
  return `${timestamp}_${randomString}.${extension}`
}

const handleSave = async () => {
  const pictures = images.value.map(async (file) => {
    const uniqueFileName = generateUniqueFileName(file.name)
    const { data, error } = await supabase.storage.from(`diary_pictures`).upload(uniqueFileName, file)

    if (error) {
      console.error('Fehler beim Hochladen des Bildes:', error)
    }

    return data?.path
  })
  const picturePaths = await Promise.all(pictures)

  if (editingEntry.value != null) {
    await diaryService?.updateEntry(editingEntry.value.id, {
      title: title.value,
      type: 1,
      content: [
        {
          text: text.value,
        },
      ],
      pictures: oldImages.value.concat(picturePaths),
    })
  } else {
    await diaryService?.saveEntry({
      title: title.value,
      type: 1,
      content: [
        {
          text: text.value,
        },
      ],
      pictures: picturePaths,
    })
  }
  globalStore.setEditingEntry(null)
  navigateTo(l('/diary'))
}

const onCancel = () => {
  globalStore.setEditingEntry(null)
  navigateTo(l('/diary'))
}

const showPreview = (index: number) => {
  // TODO show preivew in a dialog
}

const deleteEntry = async () => {
  await diaryService?.deleteEntry(editingEntry.value?.id, editingEntry.value?.pictures)
  globalStore.setEditingEntry(null)
  navigateTo(l('/diary'))
}
</script>

<style scoped>
textarea {
  height: 55dvh;
}

@media (min-height: 600px) {
  textarea {
    height: 65dvh;
  }
}

@media (min-height: 1000) {
  textarea {
    height: 85dvh;
  }
}
</style>
