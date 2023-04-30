<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex justify-center mt-5">
      <div
        class="text-primary cursor-pointer mx-2.5 my-0 p-2.5 rounded-[5px]"
        @click="setFilter('todo')"
      >
        ToDo
      </div>
      <div
        class="text-primary cursor-pointer mx-2.5 my-0 p-2.5 rounded-[5px]"
        @click="setFilter('done')"
      >
        Done
      </div>
    </div>
    <div class="flex-[1] overflow-y-auto mt-5">
      <div
        class="flex items-center mb-2.5"
        v-for="(tasks, time) in filteredTasks"
        :key="time"
      >
        <div class="text-primary text-xl font-semibold mr-5">{{ time }}</div>
        <div class="flex flex-wrap gap-2.5">
          <div
            class="bg-[#eee] p-[5px] rounded-[5px]"
            v-for="(task, index) in tasks"
            :key="index"
          >
            {{ task.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      tasks: {
        Morning: [
          { text: 'brush teeeeeeth', isDone: true },
          { text: 'eat', isDone: false },
        ],
        Evening: [{ text: 'brush again', isDone: true }],
        Everytime: [],
      },
      newTask: '',
      filter: 'todo',
    })

    const setFilter = filter => {
      state.filter = filter
    }

    const filteredTasks = computed(() => {
      if (state.filter === 'todo') {
        return {
          Morning: state.tasks.Morning.filter(task => task.isDone === false),
          Evening: state.tasks.Evening.filter(task => task.isDone === false),
          Everytime: state.tasks.Everytime.filter(task => task.isDone === false),
        }
      } else {
        return {
          Morning: state.tasks.Morning.filter(task => task.isDone === true),
          Evening: state.tasks.Evening.filter(task => task.isDone === true),
          Everytime: state.tasks.Everytime.filter(task => task.isDone === true),
        }
      }
    })

    return { state, setFilter, filteredTasks }
  },
}
</script>
