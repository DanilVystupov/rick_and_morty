const api = "https://rickandmortyapi.com/api/character";

interface Characters {
    id: number;
    name: string;
    species: string;
    image: string;
    episode: string[];
    status: string;
}

interface CharacterStore {
    characters: Characters[];
    currentPage: number;
    totalPages: number;
    searchQuery: string;
    isLoading: boolean;
    selectedStatus: string;
    isCharactersFound: boolean
}

export const useCharacterStore = defineStore('characterStore', {
    state: () => ({
        characters: [] as Characters[],
        currentPage: 1,
        totalPages: 0,
        searchQuery: '',
        isLoading: true,
        selectedStatus: 'all',
        isCharactersFound: true,
    }),

    actions: {
        async fetchCharacters(this: CharacterStore, page: number = this.currentPage) {
            try {
                this.isLoading = true;
                const response = await fetch(`${api}?page=${page}`);
                const charactersData = await response.json();
                this.characters = charactersData.results;
                this.totalPages = charactersData.info.pages;
                this.currentPage = page;
                this.isLoading = false;
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        },

        async fetchCharactersBySearchAndStatus(this: CharacterStore, name: string, status: string) {
            try {
                this.isLoading = true;
                let apiUrl = `${api}?name=${name}`;

                if (status !== 'all') {
                    apiUrl += `&status=${status}`;
                }

                const response = await fetch(apiUrl);
                const charactersData = await response.json();;

                if (charactersData.error) {
                    this.characters = [];
                    this.totalPages = 0;
                    this.isCharactersFound = true;
                } else {
                    this.characters = charactersData.results;
                    this.totalPages = charactersData.info.pages;
                    this.isCharactersFound = false;
                }

                this.currentPage = 1;
                this.selectedStatus = status;
                this.searchQuery = name;
                this.isLoading = false;
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        },

        async fetchAllCharacters(this: CharacterStore) {
            try {
                this.isLoading = true;
                this.characters = [];

                const initialResponse = await fetch(`${api}?page=1`);
                const initialData = await initialResponse.json();
                const totalPages = initialData.info.pages;

                const allCharacters: Characters[] = [];
                for (let page = 1; page <= totalPages; page++) {
                    const response = await fetch(`${api}?page=${page}`);
                    const charactersData = await response.json();
                    allCharacters.push(...charactersData.results);
                }

                this.characters = allCharacters;
                this.totalPages = totalPages;
                this.isLoading = false;
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        },

    },

    getters: {
        filteredCharacters(state) {
            const query = state.searchQuery.toLowerCase();
            return state.characters.filter((character) =>
                character.name.toLowerCase().includes(query)
            );
        },
    },
})