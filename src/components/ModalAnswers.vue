<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { Answer } from '@/types/answer';

import Modal from '@/components/Modal.vue';

import { useFetch } from '@/composables/useApi';

const modalAnswsers = ref<HTMLDialogElement>();

const show = () => modalAnswsers.value?.show();
const close = () => modalAnswsers.value?.close();

const { data: answers, loading: loadingAnswers, fetchData: fetchAnswers } = useFetch('/answers') as unknown as { data: Ref<Answer[]>, loading: Ref<Boolean>, fetchData: () => Promise<void> };

defineEmits(['answerSelected']);
defineExpose({ fetchAnswers, show, close });
</script>

<template>
    <Modal ref="modalAnswsers">
        <template #title>
            <h2>Answers</h2>
        </template>
        <template #default>
            <div class="modal-answers-loading" v-if="loadingAnswers">Loading...</div>
            <div v-else>
                <div v-if="!answers || answers.length === 0">No answer found. You can either generate all the solutions
                    or try to
                    solve the riddle yourself 😁.</div>
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
                            <tr v-for="answer in answers" :key="answer.id" @click="$emit('answerSelected', answer)">
                                <td>{{ answer.a }}</td>
                                <td>{{ answer.b }}</td>
                                <td>{{ answer.c }}</td>
                                <td>{{ answer.d }}</td>
                                <td>{{ answer.e }}</td>
                                <td>{{ answer.f }}</td>
                                <td>{{ answer.g }}</td>
                                <td>{{ answer.h }}</td>
                                <td>{{ answer.i }}</td>
                                <td>{{ answer.isValid ? "Yes" : "No" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </div>
        </template>
    </Modal>
</template>

<style scoped>
.modal-answers-loading {
    width: 300px;
}

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
</style>@/types/answer