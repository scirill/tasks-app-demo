<template>
    <v-hover :close-delay="100" :open-delay="100" v-slot="{ hover }">
        <v-card class="card" elevation="0" outlined @mouseleave="editMode = false">
            <v-card-text @dblclick="editMode = true">
                <div v-if="editMode && hover">
                    <v-textarea v-model="descriptionInEditMode"
                                label="Edit"
                                auto-grow
                                outlined
                                rows="1">
                    </v-textarea>
                    <div class="d-flex justify-end">
                        <v-btn text color="primary" @click="onDescriptionChanged">Save</v-btn>
                        <v-btn text color="primary" @click="onDescriptionEditCanceled">Cancel</v-btn>
                    </div>
                </div>
                <p v-else>{{ task.description }}</p>
            </v-card-text>
            <div v-if="hover && !editMode" class="d-flex justify-end">
                <div>
                    <v-btn v-if="task.status > 0" icon @click="$emit('statusLeft')">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn v-if="task.status < 3" icon @click="$emit('statusRight')">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
                <v-btn icon @click="$emit('delete')">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-card>
    </v-hover>
</template>

<script lang="ts">

export default {
    props: {
        task: {
            type: Object,
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
        this.descriptionInEditMode = this.task.description;
    },
    data() {
        return {
            editMode: false,
            descriptionInEditMode: ''
        }
    },
};
</script>

<style scoped>
.card {
    min-height: 100px;
}
</style>
