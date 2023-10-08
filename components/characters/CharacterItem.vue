<script setup lang="ts">

const props = defineProps({
  character: {
    type: Object,
    required: true,
    default: () => {}
  }
})

const getEpisodeId = (episode: string) => {
  const episodeUrlParts = episode.split('/');
  return episodeUrlParts[episodeUrlParts.length - 1];
};


const statusClass = computed(() => {
  const status = props.character.status;
  const statusClasses: Record<string,string> = {
    'Dead': 'status-dead',
    'Alive': 'status-alive',
    'unknown': 'status-unknown'
  };
  return statusClasses[status] || 'status-default';
});

</script>

<template>
   <NuxtLink :to="`/character/${character.id}`">
    <div class="card-image">
      <img class="card-image__item" :src="character.image" alt="image character">
      <span :class="statusClass">{{ character.status }}</span>
    </div>
  </NuxtLink>
  
  <div class="card-content">
    <h2>{{ character.name }} ({{ character.species }})</h2>
    <div class="episode-list">
      <h3>Список эпизодов с участием:</h3>
      <ul>
        <li v-for="(episode, id) in character.episode.slice(0, 5)" :key="id">
          <NuxtLink :to="`/episode/${getEpisodeId(episode)}`">{{ episode }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  margin-top: 10px;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

.card-image {
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.card-image__item {
  max-width: 100%;
}

.status-dead {
  border-radius: 5px;
  position: absolute;
  padding: 10px;
  right: 25px;
  top: 5px;
  background-color: rgb(147 43 43);
  color: white;
  opacity: 0.9;
}

.status-alive {
  border-radius: 5px;
  position: absolute;
  padding: 10px;
  right: 25px;
  top: 5px;
  background-color: cornflowerblue;
  color: white;
  opacity: 0.9;
}

.status-unknown {
  border-radius: 5px;
  position: absolute;
  padding: 10px;
  right: 25px;
  top: 5px;
  background-color: grey;
  color: white;
  opacity: 0.9;
}

.card-content {
  margin-top: 10px;
}

.episode-list {
  margin-top: 10px;
  word-wrap: break-word;
}

</style>