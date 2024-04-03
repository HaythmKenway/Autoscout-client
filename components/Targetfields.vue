<template>
  <div>
    <div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md">
      <h1>Targets</h1>
    </div>
    <div class="border-black border-2 rounded-md m-2 mb-0 min-w-78 min-h-72 max-h-72 overflow-x-hidden overflow-y-scroll">
      <div style="display: flex;flex-direction: column;" v-for="target in store.targets" :key="target.target" class="flex justify-between">
        <div class="p-1 flex">
          <button @click="toggleSubdomains(target.target)">
            <h3 class="justify-start">{{ target.target }}</h3>
          </button>
          <button class="justify-end" @click="store.runScan(target.target)"><Icon name="material-symbols-light:play-arrow" class="green text-xl"/></button>
          <button class="justify-end" @click="store.removeTarget(target.target)"><Icon name="mdi:delete" class="red text-xl"/></button>
        </div>
        <div v-if="showSubdomains && target.target === selectedTarget">
          <div v-for="sub in store.subdomains" :key="sub.target" class="text-left">
            <button @click="submitSub(sub.target)">
              <h2>{{ sub.target }}</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="addTarget" class="p-1 flex justify-between pos">
      <input type="text" class="border-2 rounded-lg" id="targetUrl" name="tgt" v-model="targetUrl"/>
      <button @click="submit" class="tgt bg-black text-white pl-3 pr-3 p-0.5 ml-1 rounded-lg">Add Target</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const store = useTargetStore();
const query = gql`{targets {target status}}`;
const variables = { limit: 5 };
const { data } = await useAsyncQuery(query, variables);
store.data = data;

let selectedTarget = '';
const showSubdomains = ref(false);
const setDomain = (tgt) => {
  selectedTarget = tgt;
  showSubdomains.value = true;
  store.fetchSubs();
  store.setDomain(tgt);
}

const targetUrl = ref('');
const submit = async () => {
  await store.addTargets(targetUrl.value).then(targetUrl.value = "");
}

const submitSub = async (tgt) => {
  console.log(tgt)
  store.setSubdomain(tgt)
  await store.getData(tgt)
}

const toggleSubdomains = (tgt) => {
  if (tgt === selectedTarget && showSubdomains.value) {
    // Clicking on the same target hides subdomains
    showSubdomains.value = false;
  } else {
    // Clicking on a different target shows its subdomains
    selectedTarget = tgt;
    showSubdomains.value = true;
    store.fetchSubs();
    store.setDomain(tgt);
  }
}
</script>

<style>
.red:hover {
  color: red;
}

.green:hover {
  color: green;
}

h3:hover {
  color: yellow;  
}

.tgt:hover {
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
