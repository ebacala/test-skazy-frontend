<script setup lang="ts">
import { ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'
import Icon from '@/components/ui/icons/Icon.vue'

import { Status, useCreate } from '@/composables/useApi'

import { useAnswersStore } from '@/stores/answers'
const store = useAnswersStore()

const modalSendAnswer = ref<HTMLDialogElement>()

const show = () => modalSendAnswer.value?.show()
const close = () => {
  reset()
  modalSendAnswer.value?.close()
}

const {
  createData: createAnswer,
  status: statusSendAnswer,
  message: messageSendAnswer,
  error: errorSendAnswer,
  reset
} = useCreate()

defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalSendAnswer">
    <template #title>
      <h2>Send Answer</h2>
    </template>

    <template #body>
      <p v-if="[Status.PENDING, Status.IDLE].includes(statusSendAnswer)">Add this answer to the database?</p>
      <p v-else-if="statusSendAnswer === Status.SUCCESS">The answer has been added to the database.</p>
      <p v-else>{{ messageSendAnswer }}</p>
    </template>

    <template #footer>
      <button type="button" v-if="[Status.IDLE, Status.PENDING, Status.ERROR].includes(statusSendAnswer)" class="m-1"
        :disabled="statusSendAnswer === Status.PENDING" @click="createAnswer('/answer', {
        a: store.currentAnswser.a,
        b: store.currentAnswser.b,
        c: store.currentAnswser.c,
        d: store.currentAnswser.d,
        e: store.currentAnswser.e,
        f: store.currentAnswser.f,
        g: store.currentAnswser.g,
        h: store.currentAnswser.h,
        i: store.currentAnswser.i
      })">
        <Icon v-show="statusSendAnswer === Status.PENDING" name="loadingSpinner" class="mr-1"></Icon>Send answer
      </button>

      <button type="button" variant="secondary" :disabled="statusSendAnswer === Status.PENDING" class="m-1"
        @click="close()">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
