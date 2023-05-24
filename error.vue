<template>
  <div class="container">
    <div>
      <h1 class="statusCode">{{ error.statusCode }}</h1>
      <p class="statusMessage">{{ error.message }}</p>
      <InputButton
        :text="$t('go_back_btn_error_page')"
        @click="handleError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError()
const l = useLocalePath()

const handleError = () => {
  clearError({
    redirect: l('/'),
  })
}
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  margin-top: auto;
  margin-bottom: auto;
}

.container div {
  display: grid;
  place-items: center;
}

.statusMessage {
  color: #ededee;
  font-size: 20px;
}

.statusCode {
  color: #ededee;
  font-size: 50px;
}
</style>
