<template>
  <div class="flex justify-between">
   <button @click="setDomain"><h3>{{ props.target.target }}</h3></button> 
    <div>
      <button @click="store.runScan(props.target.target)"><Icon name="material-symbols-light:play-arrow" class="green text-xl"/></button>
      <button @click="store.removeTarget(props.target.target)"><Icon name="mdi:delete" class=" red text-xl"/></button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({  target: Object
});
const store = useTargetStore();

const setDomain =() =>{
  const store= useTargetStore();
  store.fetchSubs()
  store.setDomain(props.target.target);  
}
</script>

<style>
.red:hover{
color:red
}
.green:hover{
color:green
}
</style>
