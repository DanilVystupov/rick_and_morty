<template>
  <div class="episode-container">
    <div class="episode-header">
      <h1 class="episode-title">Детальный просмотр эпизода #{{ id }}</h1>
      <NuxtLink class="back-link" :to="`/`">На главную</NuxtLink>
    </div>

    <div class="episode-details">
      <div class="episode-detail">
        <strong>Название эпизода:</strong> {{ episode.name }}
      </div>
      <div class="episode-detail">
        <strong>Дата премьеры:</strong> {{ episode.air_date }}
      </div>
    </div>

    <h2 class="character-heading">Персонажи, участвующие в эпизоде:</h2>

    <div v-if="charStore.isLoading" class="loader-container">
      <LazyUtilsLoader />
    </div>

    <div class="character-images">
      <NuxtLink
        v-for="(characterUrl, index) in episode.characters"
        :to="`/character/${getCharacterId(characterUrl)}`"
        :key="index"
        class="character-link"
      >
        <img
          :src="getCharacterImage(characterUrl)"
          :alt="`Character ${index + 1}`"
          class="character-image"
        />
      </NuxtLink>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useCharacterStore } from '@/store/characterStore';
import { ref } from 'vue';

const { id } = useRoute().params;
const charStore = useCharacterStore();
charStore.fetchAllCharacters()


const characterUrls = ref([]);

const url = 'https://rickandmortyapi.com/api/episode/' + id;  
const { data: episode } = await useFetch(url) as { data: any };

const getCharacterId = (characterUrl: string) => {
    const characterUrlParts = characterUrl.split('/');
    return characterUrlParts[characterUrlParts.length - 1];
};

const getCharacterImage = (characterUrl: string) => {
  const characterId = getCharacterId(characterUrl);
  const character = charStore.characters.find(char => char.id === Number(characterId));
  return character ? character.image : '';
};

characterUrls.value = episode.characters;
</script>
  
<style scoped lang="css">
.episode-container {
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.episode-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.episode-title {
  font-size: 24px;
  margin: 0;
}

.back-link {
  text-decoration: none;
  color: white;
  background-color: blueviolet;
  padding: 8px 20px;
  border-radius: 5px;
}

.episode-details {
  margin-bottom: 20px;
}

.episode-detail {
  margin-bottom: 10px;
}

.character-heading {
  font-size: 18px;
  margin-bottom: 10px;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.character-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.character-link {
  text-decoration: none;
}

.character-image {
  max-width: 100px;
  cursor: pointer;
  transition: transform 0.2s;
}

.character-image:hover {
  transform: scale(1.2);
}

@media screen and (max-width: 500px) {
  .character-images{
    justify-content: space-around;
  }
}
</style>

