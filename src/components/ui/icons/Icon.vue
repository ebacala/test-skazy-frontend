<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: false,
    default: '20px'
  },
  color: {
    type: String,
    required: false,
    default: 'inherit'
  },
  tooltip: {
    type: String,
    requred: false,
    default: null
  },
  hoverable: {
    type: Boolean,
    required: false,
    default: false
  }
})

const modules = import.meta.glob('./svg/*.svg', {
  as: 'raw',
  eager: true
})

const icon = computed(() => {
  return modules['./svg/' + props.name + '.svg'] ?? ''
})

const dynamicStyle = ref({ opacity: '1' })

const updateHoverStyle = (opacity: string) => {
  dynamicStyle.value.opacity = opacity
}
</script>

<template>
  <i
    v-html="icon"
    :style="{ height: size, width: size, color: color, ...dynamicStyle }"
    @mouseover="props.hoverable && updateHoverStyle('0.5')"
    @mouseleave="props.hoverable && updateHoverStyle('1')"
    :title="tooltip"
  />
</template>

<style scoped>
i {
  color: inherit;
  display: block;
  flex-shrink: 0;
}
</style>
