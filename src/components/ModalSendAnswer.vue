<script setup lang="ts">
import { ref, type Ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'
import Icon from '@/components/ui/icons/Icon.vue'

import { useCreate } from '@/composables/useApi'

import { useAnswersStore } from '@/stores/answers'
const store = useAnswersStore()

const modalSendAnswer = ref<HTMLDialogElement>()

const show = () => modalSendAnswer.value?.show()
const close = () => {
  responseSendAnwser.value = null,
    messageSendAnswer.value = null,
    httpCode.value = 0,
    modalSendAnswer.value?.close()
}

const {
  data: responseSendAnwser,
  loading: loadingSendAnswer,
  message: messageSendAnswer,
  httpCode,
  createData: sendAnswer
} = useCreate('/answer') as unknown as {
  data: Ref<string | null>
  loading: Ref<boolean>,
  message: Ref<string | null>,
  httpCode: Ref<number>,
  createData: (body: any) => Promise<void>
}

defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalSendAnswer">
    <template #title>
      <h2>Send Answer</h2>
    </template>

    <template #body v-if="httpCode === 0">
      <p>Add this answer to the database?</p>
    </template>

    <template #body v-else>
      <p v-if="httpCode === 200">The answer has been added to the database</p>
      <p v-else>{{ messageSendAnswer }}</p>
    </template>

    <template #footer v-if="!responseSendAnwser">
      <button type="button" class="m-1" :disabled="loadingSendAnswer" @click="sendAnswer({
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
        <Icon v-show="loadingSendAnswer" name="loadingSpinner" class="mr-1"></Icon> Send answer
      </button>

      <button type="button" variant="secondary" :disabled="loadingSendAnswer" class="m-1" @click="close()">
        Cancel
      </button>
    </template>
    <template #footer v-else>
      <button type="button" variant="secondary" :disabled="loadingSendAnswer" class="m-1" @click="close()">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
