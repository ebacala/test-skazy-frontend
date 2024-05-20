<script setup lang="ts">
import { ref, Teleport } from 'vue';

import Icon from '@/components/icons/Icon.vue';

const dialog = ref<HTMLDialogElement>();

const show = () => dialog.value?.showModal();
const close = () => dialog.value?.close();

defineExpose({ show, close });
</script>

<template>
    <Teleport to="body">
        <dialog ref="dialog" class="flex-column p-2">

            <div class="dialog-header flex-row align-items-center justify-content-space-between mb-1">
                <slot name="title">
                    Modal
                </slot>

                <Icon name="close" class="icon-close" :hoverable="true" @click="dialog?.close()"
                    tooltip="Close modal" />
            </div>

            <hr>

            <div class="dialog-body mt-1">
                <slot>

                </slot>
            </div>
        </dialog>
    </Teleport>
</template>

<style>
/* Disable scrolling if a dialog is open */
body:has(dialog[open]) {
    overflow: hidden;
    position: fixed;
}
</style>

<style scoped>
dialog {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 5px;
    color: var(--color-font);
    display: none;
    max-height: 80%;
    max-width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    &[open] {
        display: flex;
    }
}


.dialog-body {
    overflow-y: scroll;
}

.icon-close {
    color: var(--color-font);

    &:hover {
        color: var(--color-background-inverted--hover);
        cursor: pointer;
    }
}

::backdrop {
    background-color: var(--color-modal-backdrop);
}
</style>