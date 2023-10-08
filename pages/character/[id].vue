<script setup lang="ts">

const { id } = useRoute().params

const url = 'https://rickandmortyapi.com/api/character/' + id

const {data: character} = await useFetch(url) as { data: any }
    
</script>


<template>
    <div class="card-container">
        
        <div class="card">

            <div class="card-image">
                <img class="card-image__item" :src="character.image" alt="image character">
            </div>
            
            <div class="card-content">
                <h2>{{ character.name }} ({{ character.species }})</h2>
                <p>Локация: {{ character.location.name }}</p>
                <NuxtLink :to="`/`">Вернуться на главную</NuxtLink>
            </div>
        </div>
    </div>
</template>


<style scoped lang="css">

a {
  text-decoration: none;
  color: white;
  background-color: blueviolet;
  padding: 8px;
  border-radius: 5px;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.card {
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 5px;
}

.card-image {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.card-image__item {
  max-width: 100%;
}

.card-content {
  margin-top: 10px;
}

</style>