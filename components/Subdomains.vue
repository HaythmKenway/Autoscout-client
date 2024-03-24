<template>
  <div class="flex justify-between">
   <h3>{{ props.target.target }}</h3> 
  </div>
</template>

<script setup>
const props = defineProps({  target: Object});

</script>

<style>
.icon:hover{
color:red
}
</style>
