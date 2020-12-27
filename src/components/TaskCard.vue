<template>
    <v-hover :close-delay="100" :open-delay="100" v-slot="{ hover }">
        <v-card class="card" elevation="0" @mouseleave="editMode = false">
            <v-card-text @dblclick="editMode = true">
                <div v-if="editMode && hover">
                    <v-textarea v-model="descriptionInEditMode"
                                label="Edit description"
                                auto-grow
                                rows="1">
                    </v-textarea>
                    <div class="d-flex justify-end">
                        <v-btn text color="primary" @click="onDescriptionChanged">Save</v-btn>
                        <v-btn text color="primary" @click="onDescriptionEditCanceled">Cancel</v-btn>
                    </div>
                </div>
                <p v-else class="grey--text text--darken-3">{{ task.description }}</p>
                <div class="grey--text">
                    <v-avatar
                        :color="task.user.avatarColor"
                        size="30">
                        <span class="white--text">{{ task.user.name }}</span>
                    </v-avatar>
                    <v-icon class="pl-2" color="#9E9E9E">mdi-calendar-range</v-icon>
                    {{dateCreated}}
                </div>
            </v-card-text>
            <div v-if="hover && !editMode" class="d-flex justify-end">
                <div>
                    <v-btn v-if="task.status > 0" icon @click="$emit('statusLeft')">
                        <v-icon color="grey">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn v-if="task.status < 3" icon @click="$emit('statusRight')">
                        <v-icon color="grey">mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
                <v-btn icon @click="$emit('delete')">
                    <v-icon color="#E8918F">mdi-delete-outline</v-icon>
                </v-btn>
            </div>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * show the task, allows to edit the description,
 * can fire events statusRight, statusLeft, delete and descriptionChanged.
 */
export default Vue.extend({
    props: {
        task: {
            type: Object,
        }
    },
    computed: {
        dateCreated() {
            const task = this.task as Task;
            const date = new Date(task.timeCreated);
            return `${date.toDateString()}`;
        }
    },
    methods: {
        onDescriptionChanged() {
            this.editMode = false;
            this.$emit('descriptionChanged', {
                id: this.task.id,
                description: this.descriptionInEditMode,
            });
        },
        onDescriptionEditCanceled() {
            this.descriptionInEditMode = this.task.description;
            this.editMode = false;
        }
    },
    mounted() {
        const task = this.task as Task;
        this.descriptionInEditMode = task.description;
    },
    data() {
        return {
            editMode: false,
            descriptionInEditMode: '',
        }
    },
});
</script>

<style scoped>
.card {
    min-height: 100px;
}
</style>
