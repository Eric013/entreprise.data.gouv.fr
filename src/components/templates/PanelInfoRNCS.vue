<template>
  <div>
    <div v-for="(key, name) in elements" :key="key">
      <div class="company__item" v-if="parent[key]" >
        <div class="company__item-key">{{ name }}:</div>
        <div class="company__item-value">{{ parent[key] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelInfoRNCS',
  props: ['parent', 'elements']
}
</script>
