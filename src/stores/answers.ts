import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { Answer } from '@/types/answer'

export const useAnswersStore = defineStore('answers', () => {
  const answers = ref<Answer[]>([])
  const currentAnswser = ref<Answer>({
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
    h: null,
    i: null
  })

  const isCurrentAnswerComplete = computed(() => {
    const { a, b, c, d, e, f, g, h, i } = currentAnswser.value
    return [a, b, c, d, e, f, g, h, i].every((val) => val !== null && val >= 1 && val <= 9)
  })

  return { answers, currentAnswser, isCurrentAnswerComplete }
}, { persist: true })
