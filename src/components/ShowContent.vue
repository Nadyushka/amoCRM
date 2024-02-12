<script setup lang="ts">


import {toRefs} from "vue";
import {ContentType} from "../types/content"

interface PropsType {
  contentData: ContentType[] | []
  selectedContent: string
}

const props = defineProps<PropsType>()
const {contentData, selectedContent} = toRefs(props)

</script>

<template>
  <div
      v-for="content in contentData"
      :key="content.id"
      class="content"
  >
    <span class="content__id"> {{ content.id }}</span>
    <span class="content__type"> {{ selectedContent }}</span>
  </div>
</template>

<style scoped>
.content {
  margin-bottom: 8px;
  border-bottom: 1px solid black;
  padding: 4px 0;
}
</style>
