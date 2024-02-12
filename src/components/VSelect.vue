<script setup lang="ts">
import {ref, toRefs} from "vue"

interface PropsType {
  selectedValue: string
  valuesList: string[]
  width?: string
}

const props = defineProps<PropsType>()
const {selectedValue, valuesList, width} = toRefs(props)

const emit = defineEmits<{ (emit: 'update:selectedValue', value: string): void }>()

const selectListToggle = ref(false)

const inputValue = ref<string>(selectedValue.value)

const toggleList = () => selectListToggle.value = !selectListToggle.value

const selectItem = (selectedItem: string) => {
  inputValue.value = selectedItem
  emit('update:selectedValue', inputValue.value)
}
</script>

<template>
  <div
      class="select"
      :style="{
          width: `${width}px` ?? `300px`
        }"
  >
    <div class="select__wrapper">
      <input
          :value="inputValue"
          class="select__input"
          readonly
          @click="toggleList"
      />
      <button
          class="select__btn"
          @click="toggleList">
        <div
            class="select__triangle"
            :class="{
               'select__triangle_active': selectListToggle
        }"
        />
      </button>
    </div>

    <div
        class="select__list"
        v-show="selectListToggle"
    >
      <div
          class="select__item"
          v-for="value in valuesList"
          :key="value"
          @click="selectItem(value)"
      > {{ value }}
      </div>
    </div>

    <div @click="toggleList" class="select__bg" v-if="selectListToggle"/>
  </div>
</template>

<style scoped>
.select {
  position: relative;
}

.select__wrapper {
  display: flex;
}

.select__input {
  width: calc(100% - 21px);
  padding: 10px 15px;
  font-family: 'MyriadPro-Regular', sans-serif;
  font-size: 16px;
  color: #000;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #fff;
  cursor: pointer;
}

.select__btn {
  padding: 15px 8px;
  border-radius: 0 4px 4px 0;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: none;
  background-color: #f6f5f3;
  cursor: pointer;
}

.select__triangle {
  border-top: 3px solid transparent;
  border-left: 3px solid #c0c0c0;
  border-bottom: 3px solid transparent;
  transition: 0.2s all;
}

.select__triangle_active {
  transform: rotate(90deg);
  transition: 0.2s all;
}

.select__list {
  position: absolute;
  z-index: 100;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
  top: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  left: 0;
  right: 0;
  padding: 4px;
}

.select__item {
  cursor: pointer;
  transition: 0.5s all;
  font-size: 16px;
  font-family: 'MyriadPro-Regular', sans-serif;
  color: #161616;
  padding: 8px;
  border-radius: 4px;
}

.select__item:last-of-type {
  margin-bottom: 0;
}

.select__item:hover {
  background-color: rgba(192, 192, 192, 0.5);
}

.select__bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
</style>
