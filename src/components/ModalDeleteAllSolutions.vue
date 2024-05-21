<script setup lang="ts">
import { ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'
import Icon from '@/components/ui/icons/Icon.vue'

import { useDelete } from '@/composables/useApi'

import { Status } from '@/composables/useApi'

const modalDeleteAllAnswers = ref<HTMLDialogElement>()

const show = () => modalDeleteAllAnswers.value?.show()
const close = () => {
  resetDeleteAllAnswers()
  modalDeleteAllAnswers.value?.close()
}

const {
  deleteData: deleteAllAnswers,
  status: statusDeleteAllAnswers,
  error: errorDeleteAllAnswers,
  reset: resetDeleteAllAnswers
} = useDelete()
defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalDeleteAllAnswers">
    <template #title>
      <h2>Delete all the answers</h2>
    </template>

    <template #body>
      <p v-if="[Status.IDLE, Status.PENDING].includes(statusDeleteAllAnswers)">Do you really want
        to delete all the answers from the database?</p>
      <p v-else-if="statusDeleteAllAnswers === Status.SUCCESS">The answers have been deleted from the database.</p>
      <p v-else>{{ errorDeleteAllAnswers }}</p>
    </template>

    <template #footer>
      <button v-if="[Status.IDLE, Status.PENDING, Status.ERROR].includes(statusDeleteAllAnswers)" type="button"
        variant="danger" class="m-1" :disabled="statusDeleteAllAnswers === Status.PENDING"
        @click="deleteAllAnswers('/answers', null)">
        <Icon v-show="statusDeleteAllAnswers === Status.PENDING" name="loadingSpinner" class="mr-1"></Icon>Delete all
        the answers
      </button>

      <button type="button" variant="secondary" :disabled="statusDeleteAllAnswers === Status.PENDING" class="m-1"
        @click="close()">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
