<script setup lang="ts">
import { ref, toRefs, watch} from "vue";

interface PropsType {
  inputValue: string | null
  placeholder?: string
}

const props = defineProps<PropsType>()
const { inputValue, placeholder } = toRefs(props)

const emit = defineEmits<{ (emit: 'update:inputValue', value: string | number | null): void }>()

const input = ref<string |  null>(inputValue.value)

watch(() => input.value,
    () =>
        emit('update:inputValue', input.value)
)
</script>

<template>
  <div class="input">
    <input
        v-model="input"
        class="input__body"
        :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
.input {
  padding: 5px 10px;
  position: relative;
}

.input__body {
  width: calc(100% - 30px);
  padding: 10px 15px;
  font-family: 'MyriadPro-Regular', sans-serif;
  font-size: 16px;
  color: #000;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
