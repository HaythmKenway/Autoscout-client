<template>
  <div>
    <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md  "><h1>Information</h1></div>
  <div class="border-black border-2 rounded-md m-2 min-w-80	min-h-80 max-h-80 overflow-x-hidden overflow-y-scroll col-span-2">
  <div v-if="store.inf!=null" class="p-3">
    <h2><b>URL : </b> {{ store.inf.getData[0].url }}</h2>
  <h2><b>Title : </b> {{ store.inf.getData[0].title }}</h2>
  <h2><b>Host : </b> {{ store.inf.getData[0].host }}</h2>
  <h2><b>Status Code : </b> {{ store.inf.getData[0].status_code }}</h2>
  <h2><b>Scheme : </b> {{ store.inf.getData[0].scheme }}</h2>
  <h2><b>A Record : </b> {{ store.inf.getData[0].a ? store.inf.getData[0].a : 'Not Available' }}</h2>
  <h2><b>Cname : </b> {{ store.inf.getData[0].cname ? store.inf.getData[0].cname : 'Not Available' }}</h2>
  <h2><b>Tech : </b> {{ store.inf.getData[0].tech ? store.inf.getData[0].tech : 'Not Available' }}</h2>
  <h2><b>IP : </b> {{ store.inf.getData[0].ip ? store.inf.getData[0].ip : 'Not Available' }}</h2>
  <h2><b>Ports : </b> {{ store.inf.getData[0].port ? store.inf.getData[0].port : 'Not Available' }}</h2>

  </div>
</div></div>

</template> 
<script lang="ts" setup>
const store=useTargetStore()


</script>

<style>

</style>