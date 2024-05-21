<script setup lang="ts">
import { ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'
import Icon from '@/components/ui/icons/Icon.vue'

import { useCreate, Status } from '@/composables/useApi'

const modalGenerate = ref<HTMLDialogElement>()

const show = () => modalGenerate.value?.show()
const close = () => {
  reset()
  modalGenerate.value?.close()
}

const {
  createData: createSolutions,
  status: statusGeneration,
  message: messageGeneration,
  error: errorGeneration,
  reset
} = useCreate()

const generateAllSolutions = () => {
  createSolutions('/generate-all-solutions', null)
}

defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalGenerate" width="400px">
    <template #title>
      <h2>Generate all the solutions</h2>
    </template>

    <template #body>
      <p v-if="[Status.IDLE, Status.PENDING].includes(statusGeneration)">This will generate all the possible solutions
        for the riddle. Are you sure?</p>
      <p v-else-if="statusGeneration === Status.SUCCESS">{{ messageGeneration }}</p>
      <p v-else>{{ errorGeneration }}</p>
    </template>

    <template #footer>
      <button type="button" v-if="[Status.IDLE, Status.ERROR, Status.PENDING].includes(statusGeneration)"
        :disabled="statusGeneration === Status.PENDING" class="m-1" @click="generateAllSolutions()">
        <Icon v-show="statusGeneration === Status.PENDING" name="loadingSpinner" class="mr-1"></Icon>Generate all
        solutions
      </button>

      <button type="button" variant="secondary" :disabled="statusGeneration === Status.PENDING" class="m-1"
        @click="close()">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
