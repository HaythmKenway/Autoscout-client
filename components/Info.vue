<template>
  <div class="border-black border-2 rounded-md m-2 min-w-80	min-h-80 max-h-80 overflow-x-hidden overflow-y-scroll col-span-2">
  <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md  "><h1>Information</h1></div>
  <pre>{{ store.inf }}</pre>
</div>

</template> 
<script lang="ts" setup>
const store=useTargetStore()


</script>

<style>

</style>