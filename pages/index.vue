<template>
  <nav class="text-center ">
    <h1>Autoscout</h1>
  </nav>
  <section class="border-spacing-1 grid grid-cols-4 gap-4">
  <Targetfields/>
  <!-- <Subdomains/> -->
    <Info/>
</section>
</template>
<script setup>
 const store = useTargetStore();
 await store.fetchTargets();

</script>
<style>

nav{
  background: linear-gradient(
                        to right,
                        #ee7724,
                        #d8363a,
                        #dd3675,
                        #b44593
                      );
color: black;


}
*{
  background-color: #262626;
  color:white
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #000; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #5c5c5c; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
h1{
  background-color: rgba(255, 0, 0, 0);
}

</style>