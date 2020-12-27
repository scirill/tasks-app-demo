<template>
    <v-app>
        <v-main class="app">
            <Board v-for="board in boards"
                   :key="board"
                   :board="board"></Board>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Board from '@/components/Board.vue';


//Main component to show two board
export default Vue.extend({
    name: 'App',
    components: {
        Board,
    },
    data() {
        return {
            boards: ['RnD', 'Sales']
        };
    }
});
</script>

<style scoped>

.app {
    background-color: #EEF2F9;
}

</style>
