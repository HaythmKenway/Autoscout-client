<template>
  <div class="flex justify-between">
    <h3>{{ target.target }}</h3>
    <button @click="deleteTarget"><Icon name="mdi:delete" class=" icon text-xl"/></button>
  </div>
</template>

<script setup>

const props = defineProps({  target: Object
});

const deleteTarget = () => {
  const store = useTargetStore();
  store.removeTarget(props.target.target);
};
</script>

<style>
.icon:hover{
color:red
}
</style>
