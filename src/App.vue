<script setup lang="ts">
import VSelect from "./components/VSelect.vue"
import {contentTypes} from "./shared/constants.ts"
import {computed, onMounted, ref, watch} from "vue"
import VButton from "./components/VButton.vue"
import {useContentStore} from "./store/content.ts"
import {storeToRefs} from "pinia"
import {useAuthStore} from "./store/auth.ts"
import ShowContent from "./components/ShowContent.vue"
import VInput from "./components/VInput.vue"

const authStore = useAuthStore()
const {error: authError} = storeToRefs(authStore)

const contentStore = useContentStore()
const {isLoading, companies, contacts, leads, error: contentError} = storeToRefs(contentStore)

const selectedListValue = ref('Не выбрано')
const contentTitle = ref<undefined | string>()

const btnIsDisable = computed(() => selectedListValue.value === 'Не выбрано')

const showSelectedContent = computed(() => {
  if (selectedListValue.value === 'Не выбрано') {
    return []
  }
  if (selectedListValue.value === 'Сделка') {
    return leads.value
  }
  if (selectedListValue.value === 'Контакт') {
    return contacts.value
  }
  if (selectedListValue.value === 'Компания') {
    return companies.value
  }
})

const addContent = async () => {
  // if (!contentTitle.value) {
  //   contentStore.$patch(state => state.error = 'Необходимо добавить наименование')
  //   return
  // }

  const generateEngContentName = {
    'Сделка': 'leads',
    'Контакт': 'contacts',
    'Компания': 'companies',
  }

  await contentStore.createContent(generateEngContentName[selectedListValue.value], contentTitle.value)
}

watch(() => [authError.value, contentError.value],
    () => {
      setTimeout(() => {
        authStore.$patch(state => state.error = null)
        contentStore.$patch(state => state.error = null)
      }, 3000)

    }, {
      deep: true
    })

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

<!--      <VInput-->
<!--          v-model:input-value="contentTitle"-->
<!--          placeholder="Наименование"/>-->

      <VButton
          :isLoading="isLoading"
          :isDisable="btnIsDisable"
          title="Создать"
          @btn-click="addContent"
      />
    </div>

    <ShowContent
        :selected-content="selectedListValue"
        :content-data="showSelectedContent"/>

    <div
        v-show="authError || contentError"
        class="main__error"
    >

      {{ authError || contentError }}

    </div>

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

.main__error {
  position: absolute;
  padding: 8px;
  border: 1px solid red;
  border-radius: 8px;
  bottom: 16px;
  right: 16px;
  min-width: 200px;
  text-align: center;
  color: red;
  background-color: #fff;
}
</style>
