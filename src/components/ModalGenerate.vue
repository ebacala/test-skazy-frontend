<script setup lang="ts">
import { ref, type Ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'
import Icon from '@/components/ui/icons/Icon.vue'

import { useCreate } from '@/composables/useApi'

const modalGenerate = ref<HTMLDialogElement>()

const show = () => modalGenerate.value?.show()
const close = () => {
  responseGeneration.value = null
  responseGenerationMessage.value = null
  modalGenerate.value?.close()
}

const {
  data: responseGeneration,
  loading: loadingGeneration,
  message: responseGenerationMessage,
  createData: createSolutions
} = useCreate('/generate-all-solutions') as unknown as {
  data: Ref<string | null>
  loading: Ref<boolean>
  message: Ref<string | null>
  createData: () => Promise<void>
}
const generateAllSolutions = () => {
  createSolutions()
}

defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalGenerate" width="400px">
    <template #title>
      <h2>Generate all the solutions</h2>
    </template>

    <template #body v-if="responseGeneration">
      <p>{{ responseGenerationMessage }}</p>
    </template>
    <template #body v-else>
      <p>This will generate all the possible solutions for the riddle. Are you sure?</p>
    </template>

    <template #footer v-if="!responseGeneration">
      <button type="button" class="m-1" :disabled="loadingGeneration" @click="generateAllSolutions()">
        <Icon v-show="loadingGeneration" name="loadingSpinner" class="mr-1"></Icon> Generate all
        solutions
      </button>

      <button type="button" variant="secondary" :disabled="loadingGeneration" class="m-1" @click="close()">
        Cancel
      </button>
    </template>
    <template #footer v-else>
      <button type="button" variant="secondary" :disabled="loadingGeneration" class="m-1" @click="close()">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
