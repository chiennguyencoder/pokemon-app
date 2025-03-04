<script setup>
    import { computed, onMounted, ref } from 'vue'
    import Card from '../components/Card.vue'

    const url =  'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898'
    const allPokemon = ref([]);
    const searchResult = ref('')
    const temp = ref()
    const currentIndex = ref(36)

    async function fetchData(){
        try {
            console.log('Đang fetch api');
            const response = await fetch(url)

            if (!response.ok) throw new Error('Lỗi fetch danh sách pokemon')

            const data = await response.json()
            
            const PromiseList = data.results.map(async (pokemon) => {                
                const responsePokemon = await fetch(pokemon.url)
                if (!responsePokemon.ok) throw new Error(`Lỗi khi fetch thông tin pokemon : ${pokemon.name}`)
                return responsePokemon.json();
            })

            // console.log(PromiseList);
            

            allPokemon.value = await Promise.all(PromiseList)
            
            console.log("Fetch api hoàn tất")
            temp.value = allPokemon.value
        }
        catch(error){
            console.log("Lỗi: ", error)
            return null
        }
    }

    const renderList = computed(() => {
        if(searchResult.value === ''){
            return allPokemon.value.slice(0, currentIndex.value)
        }
        else {
            return allPokemon.value.filter(pokemon => pokemon.name.toLowerCase().includes(searchResult.value.toLowerCase()))
        }
    })

    function loadMoreHandle(){
        console.log('Load more pokemon');
        
        currentIndex.value += currentIndex.value*2;
    }

    onMounted(() => {
        fetchData()
    })
</script>

<template>
    <div class="container mx-auto max-w-[1200px] pt-[50px] font-sans flex items-center flex-col">
        <div class="title  text-4xl">Pokemon API</div>
        <div class="search max-w-lg w-full mx-6 mt-16">
            <input 
                type="text"
                name="search"
                id="search"
                placeholder="Search some pokemon..." 
                class="w-full p-5 rounded-full border border-gray-500 shadow-lg"
                v-model="searchResult"
                @input = 'searchHandle'>
        </div>

        <div class="pokemon-wrapper w-full mx-5 mt-14 flex-wrap flex justify-center">
            <router-link 
                v-for = "item in renderList" 
                :key="item.name"  
                :to = "`/${item.name}/${item.id}`"
                class="col mx-[5px] mb-[10px]">
                <Card :data = "item"/>
            </router-link>
        </div>

        <button 
            class="bg-[#ff4d4f] text-white font-bold p-[15px] my-[30px] rounded-[8px] cursor-pointer"
            @click = 'loadMoreHandle'>
            Load More
        </button>
    </div>
</template>

<style scope>
    .col {
        width: calc(16.667% - 10px);
        box-shadow: #0000001a 0 4px 12px;
        cursor: pointer;
        transition: box-shadow .7s;
        border-radius: 8px;

    }

    .col:hover {
        box-shadow: 0 5px 11px #0000002e, 0 4px 15px #00000026;
    }
    @media (max-width : 1200px) {
        .col{
        width: calc(25% - 10px);
        }
    }

    @media (max-width : 960px) {
        .col{
            width: calc(33.333% - 10px);
        }
    }

    @media (max-width : 770px){
        .col{
            width: calc(50% - 10px);
        }
    }
</style>