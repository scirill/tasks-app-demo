<template>
    <div>
        <v-container fluid>
            <div class="text-lg-h5 pb-3">{{ board }} Board </div>
            <v-row v-if="isLoading">
                <div class="flex justify-center">
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-row>
            <v-row v-else class="board">
                <v-col v-for="group in groupedTasks" :key="group.title" cols="12" sm="3">
                    <div class="section rounded-lg rounded pa-3"
                         :style="{'border-top' : '5px solid ' + group.color}">
                        <div class="d-flex justify-space-between" >
                            <span class="text-subtitle-2">{{ group.title }}</span>
                            <v-btn icon @click="onAddNewTask(group.status)">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <draggable :list="group.tasks" :animation="200" ghost-class="ghost-card"
                                   group="tasks" @end="updateTasksStatesAndOrder">
                            <task-card
                                v-for="(task, index) in group.tasks"
                                v-model="group.tasks[index]"
                                @statusRight="onStatusRight(group.tasks[index])"
                                @statusLeft="onStatusLeft(group.tasks[index])"
                                @delete="onDeleteTask(group.tasks[index])"
                                @descriptionChanged="onUpdateDescription"
                                :key="task.id"
                                :task="task"
                                class="mt-3">
                            </task-card>
                        </draggable>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import draggable from 'vuedraggable';
import TaskCard from '@/components/TaskCard.vue';
import {db} from '@/db'
import {CloudManager} from '@/helpers/CloudManager';
import {getChangedTasks} from "@/helpers/OrderDetectionHelper";


/**
 * Board component, can show all the tasks of one board,
 * the tasks are synced with firebase, on every change at the component,
 * the Board uses cloudManager to send sync update the cloud, but it is locally refreshed before the actual
 * update happen at the db level.
 */
export default Vue.extend({
    name: 'Board',
    components: {
        TaskCard, draggable
    },
    props: {
        board: {
            type: String,
        },
    },
    watch: {
        documents() {
            //first group all the tasks by status
            const grouped = groupBy(this.documents, 'status');

            //sort the task by the order
            function getOrderedTasks(tasks: Task[] = []) {
                return orderBy(tasks, 'order');
            }

            //group all tasks so it will be easy to display
            const groups: TaskGroup[] = [];
            for (let i = 0; i < this.sections.length ; ++i) {
                groups.push({
                    title: this.sections[i],
                    status: i,
                    color: this.sectionColors[i],
                    tasks: getOrderedTasks(grouped[i])
                })
            }
            this.groupedTasks = groups;
        },
    },
    methods: {
        updateTasksStatesAndOrder() {
            const changedTasks = getChangedTasks(this.documents, this.groupedTasks);

            for (const task of changedTasks) {
                this.cloudManager.updateStatus(task.id, task.status, task.order);
            }
        },
        onAddNewTask(status: number) {
            this.cloudManager.addNewTask(status, this.groupedTasks[status].tasks.length, 'New Task');
        },
        onStatusRight(task: Task) {
            if (task.status < this.sections.length - 1) {
                const newStatus = task.status.valueOf() + 1;
                this.cloudManager.updateStatus(task.id, newStatus, this.groupedTasks[newStatus].tasks.length);
            }
        },
        onStatusLeft(task: Task) {
            if (task.status > 0) {
                const newStatus = task.status.valueOf() - 1;
                this.cloudManager.updateStatus(task.id, newStatus, this.groupedTasks[newStatus].tasks.length);
            }
        },
        onDeleteTask(task: Task) {
            this.cloudManager.removeTask(task.id);
        },
        onUpdateDescription(payload: UpdateDescriptionPayload) {
            this.cloudManager.updateDescription(payload.id, payload.description);
        },
    },

    //init the state of the board, connect sync to firebase and wait for it to load
    async created() {
        const collection = `Boards/${this.board}/Tasks`;
        this.cloudManager.setCollection(collection);
        await this.$bind('documents', db.collection(collection))
        this.isLoading = false
    },
    data() {
        return {
            documents: [], //documents are synced with firebase
            isLoading: true,
            sections: ['Candidates', 'In Progress', 'QA / Code review', 'Completed'],
            sectionColors: ['#DC82A7', '#FD9F6A', '#8BB5F7', '#7AD2C7'],
            cloudManager: new CloudManager(),
            groupedTasks: [] as TaskGroup[],
        };
    },
});
</script>

<style scoped>
.board {
    min-height: 50vh;
}

.section {
    background-color: #F6F8FC;
    box-shadow: 2px 2px #E5E9F1;
    min-height: 50vh;
}

.ghost-card {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
}

</style>
