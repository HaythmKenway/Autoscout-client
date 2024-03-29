<template>
  <div>
    <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md">
      <h1>Targets</h1>
    </div>
    <div class="border-black border-2 rounded-md m-2 mb-0 min-w-78 min-h-72 max-h-72 overflow-x-hidden overflow-y-scroll">
      <div v-for="target in store.targets" class="flex justify-between">
        <button @click="setDomain(target.target)"><h3>{{ target.target }}</h3></button>
        <div class="justify-between p-1 grid grid-cols-2">
          <button @click="store.runScan(target.target)"><Icon name="material-symbols-light:play-arrow" class="green text-xl"/></button>
          <button @click="store.removeTarget(target.target)"><Icon name="mdi:delete" class="red text-xl"/></button>
        </div>
      </div>
    </div>
      <form @submit.prevent="addTarget" class="p-1 flex justify-between pos">
        <input type="text"class="border-2 rounded-lg" id="targetUrl" name="tgt" v-model="targetUrl"/>
        <button @click="submit" class=" tgt bg-black text-white pl-3 pr-3 p-0.5 ml-1 rounded-lg">Add Target</button>
      </form>
</div>
</template>

<script setup>

const store = useTargetStore();

const setDomain = (tgt) => {
  store.fetchSubs();
  store.setDomain(tgt);  
}

const targetUrl = ref('');
const submit = async () => {
  await store.addTargets(targetUrl.value).then(targetUrl.value="")
}
</script>

<style>
.red:hover {
  color: red;
}

.green:hover {
  color: green;
}
.tgt:hover{
  background: linear-gradient(
                        to right,
                        #ee7724,
                        #d8363a,
                        #dd3675,
                        #b44593
                      );
color: black;
                    }


</style>
