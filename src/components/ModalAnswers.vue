<script setup lang="ts">
import { ref, type Ref, watchEffect } from 'vue'

import type { Answer } from '@/types/answer'

import Icon from '@/components/ui/icons/Icon.vue'
import Modal from '@/components/ui/Modal.vue'

import { useFetch } from '@/composables/useApi'

import { useAnswersStore } from '@/stores/answers'
const store = useAnswersStore()

const {
    data: answers,
    loading: loadingAnswers,
    fetchData: fetchAnswers
} = useFetch('/answers') as unknown as {
    data: Ref<Answer[]>
    loading: Ref<boolean>
    fetchData: () => Promise<void>
}

watchEffect(() => {
    store.$patch({
        answers: answers.value
    })
})

const modalAnswsers = ref<HTMLDialogElement>()
const show = () => {
    modalAnswsers.value?.show()
    if (!store.answers || store.answers.length === 0) {
        fetchAnswers()
    }
}

const close = () => modalAnswsers.value?.close()

const setCurrentAnswer = (answer: Answer) => {
    store.$patch({ currentAnswser: answer })
    close()
}

defineExpose({ fetchAnswers, show, close })
</script>

<template>
    <Modal ref="modalAnswsers" width="500px">
        <template #title>
            <div class="flex-row align-items-center">
                <h2 class="mx-1">Answers</h2>
                <button :disabled="loadingAnswers" @click="fetchAnswers()">
                    <Icon :name="loadingAnswers ? 'loadingSpinner' : 'refresh'" size="1rem"></Icon>
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
                <table>
                    <thead>
                        <tr>
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
                            <td>{{ answer.a }}</td>
                            <td>{{ answer.b }}</td>
                            <td>{{ answer.c }}</td>
                            <td>{{ answer.d }}</td>
                            <td>{{ answer.e }}</td>
                            <td>{{ answer.f }}</td>
                            <td>{{ answer.g }}</td>
                            <td>{{ answer.h }}</td>
                            <td>{{ answer.i }}</td>
                            <td>{{ answer.isValid ? 'Yes' : 'No' }}</td>
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
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1em;
    font-family: 'Arial', sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}

th,
td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
}

tbody tr {
    border-bottom: 1px solid #dddddd;
}

tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}
</style>