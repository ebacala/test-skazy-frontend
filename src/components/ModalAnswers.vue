<script setup lang="ts">
import { ref, type Ref, watchEffect } from 'vue'

import type { Answer } from '@/types/answer'

import Icon from '@/components/ui/icons/Icon.vue'
import Modal from '@/components/ui/Modal.vue'

import { useFetch, useDelete, Status } from '@/composables/useApi'


import { useAnswersStore } from '@/stores/answers'
const store = useAnswersStore()

const {
    fetchData,
    status: statusFetchAnswers,
    data: answers,
    reset
} = useFetch()

const fetchAnswers = () => {
    fetchData("/answers").then(() => {
        if (answers.value) {
            store.$patch({
                answers: answers.value
            })
        }
    })
}
const setCurrentAnswer = (answer: Answer) => {
    store.$patch({ currentAnswser: answer })
    close()
}

const modalAnswsers = ref<HTMLDialogElement>()
const show = () => {
    modalAnswsers.value?.show()
    if (!store.answers || store.answers.length === 0) {
        fetchAnswers()
    }
}
const close = () => {
    reset()
    modalAnswsers.value?.close()
}

const {
    deleteData,
    status: statusDeleteAnswer
} = useDelete()

const deleteAnswer = (answer: Answer) => {
    deleteData('/answer/' + answer.id, null).then(() => fetchAnswers())
}

defineExpose({ fetchAnswers, show, close })
</script>

<template>
    <Modal ref="modalAnswsers" width="600px">
        <template #title>
            <div class="flex-row align-items-center">
                <h2 class="mx-1">Answers</h2>
                <button type="button" :disabled="statusFetchAnswers === Status.PENDING" @click="fetchAnswers()">
                    <Icon :name="statusFetchAnswers === Status.PENDING ? 'loadingSpinner' : 'refresh'" size="1rem">
                    </Icon>
                </button>
            </div>
        </template>

        <template #body>
            <div v-if="!store.answers || store.answers.length === 0">
                No answer found. You can either generate all the solutions or try to solve the riddle
                yourself 😁.
            </div>
            <template v-else>
                <p>Click on the answer to add it to the grid.</p>
                <table class="w-100 my-1">
                    <thead>
                        <tr>
                            <th></th>
                            <th>a</th>
                            <th>b</th>
                            <th>c</th>
                            <th>d</th>
                            <th>e</th>
                            <th>f</th>
                            <th>g</th>
                            <th>h</th>
                            <th>i</th>
                            <th>Is valid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="answer in store.answers" :key="answer.id" @click="setCurrentAnswer(answer)">
                            <td class="flex-row justify-content-center align-items-center">
                                <Icon name="delete" color="var(--color-danger)" :hoverable="true"
                                    @click.stop="deleteAnswer(answer)">
                                </Icon>
                            </td>
                            <td class="text-center">{{ answer.a }}</td>
                            <td class="text-center">{{ answer.b }}</td>
                            <td class="text-center">{{ answer.c }}</td>
                            <td class="text-center">{{ answer.d }}</td>
                            <td class="text-center">{{ answer.e }}</td>
                            <td class="text-center">{{ answer.f }}</td>
                            <td class="text-center">{{ answer.g }}</td>
                            <td class="text-center">{{ answer.h }}</td>
                            <td class="text-center">{{ answer.i }}</td>
                            <td class="text-center">{{ answer.isValid ? 'Yes' : 'No' }}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </template>

        <template #footer>
            <button type="button" variant="secondary" class="m-1" @click="close()">
                Close
            </button>
        </template>
    </Modal>
</template>

<style scoped>
table {
    border-collapse: collapse;
}

thead tr {
    background-color: #009879;
    color: #ffffff;
    font-weight: bold;
}

th,
td {
    padding: .5rem;
    border: 1px solid #dddddd;
}

tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}
</style>