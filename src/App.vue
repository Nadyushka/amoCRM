<script setup>

import VSelect from "./components/VSelect.vue"
import {contentTypes} from "./shared/constants.ts"
import {computed, onMounted, ref} from "vue";
import VButton from "./components/VButton.vue"
import {useContentStore} from "./store/content.ts"
import {storeToRefs} from "pinia"
import {useAuthStore} from "./store/auth.ts"
import ShowContent from "./components/ShowContent.vue"

const authStore = useAuthStore()

const contentStore = useContentStore()
const {isLoading, companies, contacts, leads} = storeToRefs(contentStore)

const selectedListValue = ref('Не выбрано')

const btnIsUnable = computed(() => selectedListValue.value === 'Не выбрано')

const showSelectedContent = computed(() => {
  if (selectedListValue.value === 'Не выбрано') {
    return []
  }
  if (selectedListValue.value === 'Сделка') {
    return leads
  }
  if (selectedListValue.value === 'Контакт') {
    return contacts
  }
  if (selectedListValue.value === 'Компания') {
    return companies
  }
})

const addContent = async () => {
  const generateEngContentName = {
    'Сделка': 'leads',
    'Контакт': 'contacts',
    'Компания': 'companies',
  }

  await contentStore.createContent(generateEngContentName[selectedListValue.value])

}

onMounted(async () => {
  await authStore.auth()
})
</script>

<template>
  <div class="main">

    <div class="main__select">
      <VSelect
          v-model:selected-value="selectedListValue"
          width="300"
          :values-list="contentTypes"/>

      <VButton
          :isLoading="isLoading"
          :isUnable="btnIsUnable"
          title="Создать"
          @btn-click="addContent"
      />
    </div>

    <ShowContent
        :selected-content="selectedListValue"
        :content-data="showSelectedContent"/>

  </div>

</template>

<style scoped>
.main {
  padding: 16px;
}

.main__select {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}
</style>
