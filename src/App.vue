<template>
    <v-app>
        <v-main>
            <Board v-for="board in boards"
                   :key="board"
                   :board="board"></Board>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "./components/Board.vue";

interface BoardData {
    displayName: string;
    collection: string;
}

export default Vue.extend({
  name: "App",
  components: {
    Board,
  },

    computed: {
    },

  methods: {

  },
  data() {
    return {
        boards: ['Sales','RnD']
    };
  }
});

</script>

<style scoped>
</style>
