<template>
  <div id="app">
      <v-container fluid>
          <div class="text-lg-h5 pb-3">{{board}} Board</div>
          <v-row v-if="isLoading">
              <div class="flex justify-center">
                  <v-progress-circular
                      :size="50"
                      color="primary"
                      indeterminate
                  ></v-progress-circular>
              </div>
          </v-row>
          <v-row v-else style="min-height: 50vh">
            <v-col v-for="group in groupedTasks" :key="group.title" class="bg-gray-100 rounded-lg column-width rounded mx-2">
                <div class="d-flex justify-space-between">
                    <span class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{group.title}}</span>
                    <v-btn icon @click="onAddNewTask(group.status)"><v-icon>mdi-plus</v-icon></v-btn>
                </div>

                <task-card
                    v-for="(task, index) in group.tasks"
                    v-model="group.tasks[index]"
                    @statusRight="onStatusRight(group.tasks[index])"
                    @statusLeft="onStatusLeft(group.tasks[index])"
                    @delete="onDeleteTask(group.tasks[index])"
                    @descriptionChanged="onUpdateDescription"
                    :key="task.id"
                    :task="task"
                    class="mt-3 cursor-move"
                ></task-card>
            </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TaskCard from "./TaskCard.vue";
import { db } from '@/db'
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import {CloudManager} from '@/helpers/CloudManager';

enum Status {
  Candidates, InProgress, Review, Completed
}

export default Vue.extend({
  name: 'Board',
  components: {
    TaskCard,
  },
    props: {
        board: {
            type: String,
        },
    },
  methods: {
      onAddNewTask(status: number) {
          this.cloudManager.addNewTask(status);
      },
      onStatusRight(task: Task) {
          if (task.status < 3) {
              this.cloudManager.updateStatus(task.id, task.status.valueOf() + 1);
          }
      },
      onStatusLeft(task: Task) {
          if (task.status > 0) {
              this.cloudManager.updateStatus(task.id, task.status.valueOf() - 1);
          }
      },
      onDeleteTask(task: Task) {
          this.cloudManager.removeTask(task.id);
      },
      onUpdateDescription(payload: any) {
          this.cloudManager.updateDescription(payload.id, payload.description);
      },
  },

  computed: {
    groupedTasks(): TaskGroup[] {
        const grouped = groupBy(this.documents, 'status', 'desc');

        function getOrderedTasks(tasks: Task[] = []) {
            return orderBy(tasks, 'timeCreated');
        }

        // return groups;
        const groups = [{title: 'Candidates', status: 0, tasks: getOrderedTasks(grouped[0])},
            {title: 'In Progress', status: 1, tasks: getOrderedTasks(grouped[1])},
            {title: 'QA / Code review', status: 2, tasks: getOrderedTasks(grouped[2])},
            {title: 'Completed', status: 3, tasks: getOrderedTasks(grouped[3])}];

        return groups;
    }
  },
    async created() {
        const collection = `Boards/${this.board}/Tasks`;
        this.cloudManager = new CloudManager(collection);
        await this.$bind('documents', db.collection(collection))
        this.isLoading = false
    },
  data() {
    return {
        documents: [],
        isLoading: true,
    };
  },
});
</script>

<style scoped>


/*.column-width {*/
/*  min-width: 320px;*/
/*  width: 320px;*/
/*}*/

/* Unfortunately @apply cannot be setup in codesandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
/*.ghost-card {*/
/*  opacity: 0.5;*/
/*  background: #F7FAFC;*/
/*  border: 1px solid #4299e1;*/
/*}*/
</style>
