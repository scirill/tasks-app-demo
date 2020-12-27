interface Task {
    id: string;
    timeCreated: number;
    order: number;
    description: string;
    status: Status;
    user: User;
}

interface TaskGroup {
    title: string;
    status: number;
    color: string;
    tasks: Task[];
}

interface User {
    name: string;
    avatarColor: string;
}

interface UpdateDescriptionPayload {
    id: string;
    description: string;
}