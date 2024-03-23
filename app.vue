<template>
  <nav class="text-white bg-black text-center	">
    Autoscout
  </nav>
  <section>
    <div>
      <li v-for="item in data.targets">{{ item.target }}</li>
    </div>
    <form @submit.prevent="addTarget">
    <input type="text" id="targetUrl" name="tgt" v-model="targetUrl"/>
    <button @click="submit">Submit</button>
  </form>
    <div></div>
  </section>
</template>

<script setup>
const query=gql`{targets {target }}`
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query,variables);

const targetUrl = ref('');

const submit = async () => {
  console.log(targetUrl.value);

  const mutationQuery = `
    mutation AddTarget($target: String!) {
      addTarget(input: { 
        target: $target 
      }) {
        target
        lastModified
      }
    }
  `;

  const requestBody = {
    query: mutationQuery,
    variables: { target: targetUrl.value }
  };

  try {
    const response = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Mutation error:', error);
  }
}

</script>
<style>

</style>