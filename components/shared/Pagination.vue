<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCharacterStore } from '@/store/characterStore';

const store = useCharacterStore();

const currentPage = ref(1);
const selectedPage = ref('...')
const totalPages = computed(() => store.totalPages);
const dropdownOpen = ref(false);

const visiblePages = computed(() => {
  const totalPagesValue = totalPages.value;
  if (totalPagesValue <= 3) {
    return Array.from({ length: totalPagesValue }, (_, index) => index + 1);
  } else {
    return [1, 2, 3];
  }
});

const dropdownPages = computed(() => {
  const totalPagesValue = totalPages.value;
  const pages = Array.from({ length: totalPagesValue }, (_, index) => index + 1);
  if (totalPagesValue <= 3) {
    return [];
  } else {
    return pages.slice(3, totalPagesValue);
  }
});

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false
}

function changePage(page: number) {
  currentPage.value = page;
  closeDropdown();
}

function selectAndCloseDropdown(page: number) {
  changePage(page);
  closeDropdown();
}

watch(currentPage, (newPage) => {
  if (newPage >= 1 && newPage <= 3) {
    selectedPage.value = '...';
  } else {
    selectedPage.value = String(newPage);
  }
  store.fetchCharacters(newPage);
});
</script>

<template>
  <div class="pagination" @click="closeDropdown">
    <div class="pagination__title">Страницы:</div>
    <ul class="pagination__list">
      <li v-for="page in visiblePages" :key="page">
        <button @click="changePage(page)" :class="{ 'pagination__button--active': currentPage === page }" class="pagination__button">{{ page }}</button>
      </li>
      <li :class="{ 'pagination__item--active': dropdownOpen }" class="pagination__item">
        <button @click.stop="toggleDropdown" class="pagination__button">{{ dropdownOpen ? '▲' : `${selectedPage}` }}</button>
        <ul v-show="dropdownOpen" class="pagination__dropdown" @click.stop>
          <li v-for="page in dropdownPages" :key="page" class="pagination__dropdown-item">
            <button @click="selectAndCloseDropdown(page)" :class="{ 'pagination__button--active': currentPage === page }" class="pagination__button">{{ page }}</button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>


<style lang="css" scoped>
.pagination {
  display: flex;
  margin-top: 20px;
}

.pagination__title {
  display: flex;
  align-items: center;
  font-size: calc(20px + 11 * (100vw / 1280));
}

.pagination__list {
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  list-style: none;
  gap: 5px;
  padding: 0;
}

.pagination__item--active {
  display: block;
}

.pagination__button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination__button:hover {
  background-color: #0056b3;
}

.pagination__button--active {
  background-color: #0056b3;
}

.pagination__dropdown-button {
  background-color: grey;
  color: white;
  cursor: pointer;
}

.pagination__dropdown-button:hover {
  background-color: #0056b3;
}

.pagination__dropdown {
  gap: 10px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  position: absolute;
  top: 75px;
  left: 46px;
  z-index: 1;
  display: flex;
}

.pagination__dropdown.active {
  display: flex;
}

.pagination__dropdown-item {
  display: flex;
  text-align: center;
}
</style>