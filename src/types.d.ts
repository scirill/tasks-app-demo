interface Task {
    id: string;
    timeCreated: number;
    description: string;
    status: Status;
}

interface TaskGroup {
    title: string;
    status: number;
    tasks: Task[];
}

interface UpdateDescriptionPayload {
    id: string;
    description: string;
}