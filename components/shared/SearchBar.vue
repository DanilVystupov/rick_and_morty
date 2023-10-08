<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useCharacterStore } from '@/store/characterStore';

const store = useCharacterStore();
const searchQuery = ref('');
const selectedStatus = ref('all'); 

let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  const savedSearchQuery = localStorage.getItem('searchQuery');
  const savedStatus = localStorage.getItem('selectedStatus');

  if (savedSearchQuery) {
    searchQuery.value = savedSearchQuery;
  }

  if (savedStatus) {
    selectedStatus.value = savedStatus;
  }

  store.fetchCharactersBySearchAndStatus(searchQuery.value, selectedStatus.value);
});

watch(searchQuery, (newValue) => {
  localStorage.setItem('searchQuery', newValue);
  store.fetchCharactersBySearchAndStatus(newValue, selectedStatus.value);
});

watch(selectedStatus, (newValue) => {
  localStorage.setItem('selectedStatus', newValue);
  store.fetchCharactersBySearchAndStatus(searchQuery.value, newValue);
});

const handleSearchInput = () => {
  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    store.fetchCharactersBySearchAndStatus(searchQuery.value, selectedStatus.value);
  }, 500);
};

const handleSubmit = (event: Event) => {
  event.preventDefault();
  store.fetchCharactersBySearchAndStatus(searchQuery.value, selectedStatus.value);
};

const clearSearchInput = () => {
  searchQuery.value = '';
  store.fetchCharacters();

  if (timer !== null) {
    clearTimeout(timer);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Введите имя персонажа..."
      class="search-input"
      @input="handleSearchInput"
    />
    <span class="clear-input" v-if="searchQuery" @click="clearSearchInput">
      &#11198;
    </span>
  </form>
</template>
   
<style scoped> 
.search-bar {
    margin: 10px 0;
    position: relative;
}
   
.search-input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
}
.clear-input {
  position: absolute;
  top: 50%; 
  right: 10px; 
  transform: translateY(-50%); 
  cursor: pointer;
}
</style>