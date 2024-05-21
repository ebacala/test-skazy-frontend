<script setup lang="ts">
import { ref } from 'vue'

import Modal from '@/components/ui/Modal.vue'

const modalHint = ref<HTMLDialogElement>()

const show = () => modalHint.value?.show()
const close = () => modalHint.value?.close()

defineExpose({ show, close })
</script>

<template>
  <Modal ref="modalHint" width="400px">
    <template #title>
      <h2>Hint</h2>
    </template>
    <template #body>
      <p class="mb-1">This riddle can be turned into an equation :</p>

      <p class="mb-1">
        <var>a + 13 * b / c + d + 12 * e - f - 11 + g * h / i - 10 = 66</var>
      </p>

      <p class="mb-1">Now we can isolate the unknowns :</p>

      <p class="mb-1"><var>a + (13b / c) + d + 12e - f + (gh / i) = 66 + 11 + 10</var></p>

      <p class="mb-1">or</p>

      <p class="mb-1"><var>a + (13b / c) + d + 12e - f + (gh / i) = 87</var></p>

      <p>Now you should be able to find some solutions ✌️ (there are 128 solutions).</p>
    </template>

    <template #footer>
      <button type="button" variant="secondary" class="m-1" @click="close()">
        Close
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
