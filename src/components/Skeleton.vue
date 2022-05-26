<template>
  <content-loader
      :width="280"
      :height="500"
      viewBox="0 0 280 500"
      primaryColor="#f3f3f3"
      secondaryColor="#cccccc"
    >
      <circle cx="134" cy="136" r="125" />
      <rect x="0" y="290" rx="10" ry="10" width="280" height="24" />
      <rect x="0" y="333" rx="10" ry="10" width="280" height="87" />
      <rect x="0" y="445" rx="10" ry="10" width="95" height="27" />
      <rect x="125" y="439" rx="24" ry="24" width="152" height="40" />
    </content-loader>
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
import { ContentLoader, } from 'vue-content-loader'

export default defineComponent({
  components: {
    ContentLoader,
  },
},)
</script>
