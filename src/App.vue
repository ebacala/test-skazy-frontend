<script setup lang="ts">
import { ref } from 'vue';

import ModalHint from "@/components/ModalHint.vue";
import ModalAnswsers from "@/components/ModalAnswers.vue";
import type { Answer } from './types/answer';

const a = ref();
const b = ref();
const c = ref();
const d = ref();
const e = ref();
const f = ref();
const g = ref();
const h = ref();
const i = ref();

// Modal meant to display the hint
const modalHint = ref();

// Modal meant to display the list of all the answers
const modalAnswsers = ref();
const showAnswers = () => {
  modalAnswsers.value.show();
  modalAnswsers.value.fetchAnswers();
}
const addAnswerToGrid = (answer: Answer) => {
  a.value = answer.a;
  b.value = answer.b;
  c.value = answer.c;
  d.value = answer.d;
  e.value = answer.e;
  f.value = answer.f;
  g.value = answer.g;
  h.value = answer.h;
  i.value = answer.i;
  modalAnswsers.value.close();
}

</script>

<template>
  <main class="flex-column align-items-center justify-content-center">
    <h1 class="m-3">Welcome to this 🇻🇳 riddle!</h1>
    <p>The goal of this riddle is to fill the colored squares (starting from the top left) with digits from 1 to 9
      in
      order to solve the equation.</p>
    <p>⚠️ You can't reuse a digit!</p>

    <button type="button" class="m-1" @click="modalHint?.show()">Hint</button>
    <ModalHint ref="modalHint"></ModalHint>

    <div class="grid-container m-2">
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="a"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="e"></input></div>
      <div class="grid-item sign">-</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="f"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item result">66</div>
      <div class="grid-item sign">+</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">x</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">-</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">=</div>
      <div class="grid-item">13</div>
      <div class="grid-item empty"></div>
      <div class="grid-item">12</div>
      <div class="grid-item empty"></div>
      <div class="grid-item">11</div>
      <div class="grid-item empty"></div>
      <div class="grid-item">10</div>
      <div class="grid-item sign">x</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">+</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">+</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">-</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="b"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="d"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="g"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="i"></input></div>
      <div class="grid-item sign">:</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="c"></input></div>
      <div class="grid-item sign">+</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">x</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9" v-model="h"></input></div>
      <div class="grid-item sign">:</div>
    </div>

    <div class="flex-row align-items-center justify-content-center">
      <button type="button" class="m-1" @click="showAnswers()">Show answers</button>
      <ModalAnswsers ref="modalAnswsers" @answer-selected="addAnswerToGrid"></ModalAnswsers>
    </div>
  </main>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: .5px;
  padding: 10px;
  width: 50%;
  height: 50%;
}

.grid-item {
  align-items: center;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  padding: 10px;
  text-align: center;

  input {
    text-align: center;
  }

  /* Remove the inputs controls */

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
}

/* Remove borders from the second, fourth and sixth columns */
.grid-item:nth-child(7n+2),
.grid-item:nth-child(7n+4),
.grid-item:nth-child(7n+6) {
  border: none;
}

/* Add borders to link the columns */
.grid-item:nth-child(4),
.grid-item:nth-child(37),
.grid-item:nth-child(41) {
  border: 1px solid #000;
}

.unknown {
  background-color: antiquewhite;
}

.sign {
  background-color: lightgrey;
}

.result {
  background-color: gold;
}
</style>
