<script setup lang="ts">
import {toRefs} from "vue";

interface PropsType {
  title: string
  isLoading?: boolean
  isDisable?: boolean
}

const props = defineProps<PropsType>()
const {title, isLoading, isDisable} = toRefs(props)

defineEmits<{ (emit: 'btnClick'): void }>()

</script>

<template>
  <button
      class="button"
      :class=" {
          'button_enable': isDisable
        }"
      :style="{
        'padding': isLoading && '4px 10px'
      }"
      :disabled="isDisable"
      @click="$emit('btnClick')"
  >

    <div
        v-if="isLoading"
        class="button__loader"
    >
      <div class="button__loader-circle"/>
    </div>

    <span v-else> {{ title }} </span>

  </button>
</template>

<style scoped>
.button {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  border: 1px solid rgba(47, 140, 255, 0.5);
  background-color: #2f8cff;
  font-family: 'MyriadPro-Regular ', sans-serif;
  font-weight: 400;
  display: flex;
  gap: 7px;
  transition: 0.2s all;
  min-width: 100px;
  min-height: 40px;
  justify-content: center;
  align-items: center;
}

.button:active {
  background-color: rgba(47, 140, 255, 0.5);
  color: #fff;
  border: 1px solid transparent;
}

.button_enable,
.button:disabled {
  color: rgba(255, 255, 255);
  background-color: rgba(128, 128, 128);
  border: 1px solid transparent;
}

.button__loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
}

.button__loader-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #fff;
  border-top-color: #333;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
