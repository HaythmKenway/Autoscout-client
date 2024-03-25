<template>
  <nav class="text-white bg-black text-center">
    Autoscout
  </nav>
  <section class="flex border-spacing-1">
    <div>
    <div class="border-black border-2 rounded-md m-2 mb-0 min-w-78	min-h-80 overflow-x-hidden overflow-y-scroll " >
  <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md"><h1>Targets</h1></div>
  <ul v-if="targets" class="m-3">
    <div v-for="target in targets"><Targetfields :target="target "/></div>
  </ul>

</div>
  <form @submit.prevent="addTarget" class="p-1 flex justify-between ">
    <input type="text"class="border-2 rounded-lg" id="targetUrl" name="tgt" v-model="targetUrl"/>
    <button @click="submit" class=" tgt bg-black text-white pl-3 pr-3 p-0.5 ml-1 rounded-lg">Add Target</button>
  </form>
</div>
<div class="border-black border-2 rounded-md m-2 min-w-80	min-h-80 max-h-80 overflow-x-hidden overflow-y-scroll">
  <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md  "><h1>Subdomains</h1></div>
    <div v-for="target in targetStore.subdomains"><Subdomains :target="target"/></div>
</div>
  </section>
</template>


<script setup>
 const store = useTargetStore();
 await store.fetchTargets();
 const targets=store.targets;
 const targetStore = useTargetStore();

watch(store.subdomains,()=>{subdomains=store.subs})
const targetUrl = ref('');
const submit = async () => {
  await store.addTargets(targetUrl.value).then(targetUrl.value="")
}

</script>
<style>
.tgt:hover{
  background:green
}
</style>