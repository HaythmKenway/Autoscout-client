<template>
<div><div class="text-center text-white bg-slate-600 m-1 p-2 rounded-md flex "><h1>Subdomains</h1></div>
<div class="border-black border-2 rounded-md m-2 min-w-80	min-h-80 max-h-80 overflow-x-hidden overflow-y-scroll">
      <div v-for="target in store.subdomains" class="text-left"><button @click="submitSub(target.target)"><h2> {{ target.target }}</h2></button>
    </div>
</div></div>  
</template>

<script setup>
const store=useTargetStore()
const submitSub= async(tgt)=>{
 store.setSubdomain(tgt)
 await store.getData(tgt)
}
</script>

<style>
.icon:hover{
color:red
}
</style>
