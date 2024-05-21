<script setup lang="ts">
import { ref, type Ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'
import Icon from '@/components/ui/icons/Icon.vue'

import { useDelete } from '@/composables/useApi'

import { useAnswersStore } from '@/stores/answers'
const store = useAnswersStore()

const modalDeleteAllAnswers = ref<HTMLDialogElement>()

const show = () => modalDeleteAllAnswers.value?.show()
const close = () => {
  responseDeleteAllAnswers.value = null
  messageDeleteAllAnswers.value = null
  httpCode.value = 0
  modalDeleteAllAnswers.value?.close()
}

const {
  data: responseDeleteAllAnswers,
  loading: loadingDeleteAllAnswers,
  message: messageDeleteAllAnswers,
  httpCode,
  deleteData: deleteAllAnswers
} = useDelete('/answers') as unknown as {
  data: Ref<string | null>
  loading: Ref<boolean>,
  message: Ref<string | null>,
  httpCode: Ref<number>,
  deleteData: (body: any) => Promise<void>
}

defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalDeleteAllAnswers">
    <template #title>
      <h2>Delete all the answers</h2>
    </template>

    <template #body v-if="httpCode === 0">
      <p>Do you really want to delete all the answers from the database?</p>
    </template>

    <template #body v-else>
      <p v-if="httpCode === 200">The answers have been deleted from the database.</p>
      <p v-else>{{ messageDeleteAllAnswers }}</p>
    </template>

    <template #footer v-if="!responseDeleteAllAnswers">
      <button type="button" variant="danger" class="m-1" :disabled="loadingDeleteAllAnswers"
        @click="deleteAllAnswers(null)">
        <Icon v-show="loadingDeleteAllAnswers" name="loadingSpinner" class="mr-1"></Icon> Delete all the answers
      </button>

      <button type="button" variant="secondary" :disabled="loadingDeleteAllAnswers" class="m-1" @click="close()">
        Cancel
      </button>
    </template>
    <template #footer v-else>
      <button type="button" variant="secondary" :disabled="loadingDeleteAllAnswers" class="m-1" @click="close()">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
