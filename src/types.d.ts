interface Task {
    id: string;
    timeCreated: number;
    description: string;
    status: Status;
}

interface TaskGroup {
    title: string;
    status: number;
    color: string;
    tasks: Task[];
}

interface UpdateDescriptionPayload {
    id: string;
    description: string;
}