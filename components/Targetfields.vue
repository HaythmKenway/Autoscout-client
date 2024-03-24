<template>
  <div class="flex justify-between">
   <button @click="setDomain"><h3>{{ props.target.target }}</h3></button> 
    <div>
      <button @click="runScan"><Icon name="material-symbols-light:play-arrow" class="green text-xl"/></button>
      <button @click="deleteTarget"><Icon name="mdi:delete" class=" red text-xl"/></button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({  target: Object
});
const runScan = () =>{
  
}
const deleteTarget = () => {
  const store = useTargetStore();
  store.removeTarget(props.target.target);
};

const setDomain =() =>{
  const store= useTargetStore();
  store.fetchSubs()
  console.log("ggd")
  console.log(props.target.target)
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
