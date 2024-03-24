<template>
  <nav class="text-white bg-black text-center">
    Autoscout
  </nav>
  <section class="flex border-spacing-1">
<div class="border-black border-2 rounded-md">
  <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md"><h1>Targets</h1></div>
  <ul v-if="targets" class="m-3">
    <div v-for="target in targets"><Targetfields :target="target"/></div>
  </ul>

  <form @submit.prevent="addTarget" class="p-2 flex justify-between">
    <input type="text"class="border-2 rounded-lg" id="targetUrl" name="tgt" v-model="targetUrl"/>
    <button @click="submit" class=" tgt bg-black text-white pl-3 pr-3 p-0.5 ml-1 rounded-lg">Add Target</button>
  </form>
</div>
    <div></div>
  </section>
</template>


<script setup>
 const store = useTargetStore();
 await store.fetchTargets();
 const targets=store.targets;

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