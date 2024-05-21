<script setup lang="ts">
import { ref } from 'vue';

import ModalHint from "@/components/ModalHint.vue";
import ModalAnswsers from "@/components/ModalAnswers.vue";
import ModalGenerate from "@/components/ModalGenerate.vue";
import ModalSendAnswer from "@/components/ModalSendAnswer.vue";
import ModalDeleteAllSolutions from '@/components/ModalDeleteAllSolutions.vue';

import { useAnswersStore } from "@/stores/answers";
const store = useAnswersStore();

// Modal meant to display the hint
const modalHint = ref();

// Modal meant to display the list of all the answers
const modalAnswsers = ref();

// Modal to ask the user if they want to generate all the solutions
const modalGenerate = ref();

// Modal to ask to user if they want to send the current anwser
const modalSendAnswer = ref();

// Modal to ask the user if they want to delete all the solutions from the database
const modalDeleteAllSolutions = ref();
</script>

<template>
  <main class="flex-column align-items-center justify-content-center p-3">
    <h1 class="m-3 text-center">Welcome to this 🇻🇳 riddle!</h1>
    <p>The goal of this riddle is to fill the colored squares (starting from the top left) with digits from 1 to 9
      in
      order to solve the equation.</p>
    <p>⚠️ You can't reuse a digit!</p>

    <button type="button" class="m-1" @click="modalHint?.show()">Hint</button>
    <ModalHint ref="modalHint"></ModalHint>

    <div class="grid-container m-1">
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.a"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.e"></input></div>
      <div class="grid-item sign">-</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.f"></input></div>
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
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.b"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.d"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.g"></input></div>
      <div class="grid-item empty"></div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.i"></input></div>
      <div class="grid-item sign">:</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.c"></input></div>
      <div class="grid-item sign">+</div>
      <div class="grid-item empty"></div>
      <div class="grid-item sign">x</div>
      <div class="grid-item unknown"><input type="number" min="1" max="9"
          v-model.number="store.currentAnswser.h"></input></div>
      <div class="grid-item sign">:</div>
    </div>

    <div class="flex-row align-items-center justify-content-center flex-wrap">
      <button type="button" class="m-1" @click="modalAnswsers?.show()">Show answers</button>
      <ModalAnswsers ref="modalAnswsers"></ModalAnswsers>

      <button type="button" class="m-1" @click="modalGenerate?.show()">Generate all solutions</button>
      <ModalGenerate ref="modalGenerate"></ModalGenerate>

      <button type="button" class="m-1" :disabled="!store.isCurrentAnswerComplete" @click="modalSendAnswer?.show()">Send
        answer</button>
      <ModalSendAnswer ref="modalSendAnswer"></ModalSendAnswer>

      <button type="button" variant="danger" class="m-1" @click="modalDeleteAllSolutions?.show()">Delete all the
        solutions</button>
      <ModalDeleteAllSolutions ref="modalDeleteAllSolutions"></ModalDeleteAllSolutions>
    </div>
  </main>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: .5px;
  max-width: 90%;
  height: 50%;
}

.grid-item {
  align-items: center;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  padding: 10px;
  text-align: center;
  max-height: 100px;
  height: 100%;
  width: 100%;
  aspect-ratio: 1;

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

  input {
    padding: .1rem;
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
