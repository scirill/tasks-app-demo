/**
 * help function that is used to detect what task have changed after dragging (by status or order in list)
 * @param beforeChangeTasks - original tasks
 * @param newChangedTasks - group of tasks with new order and statuses
 */
export function getChangedTasks(beforeChangeTasks: Task[], newChangedTasks: TaskGroup[]): Task[] {

    //create map for old task for fast access
    const map = new Map();
    for (const task of beforeChangeTasks) {
        map.set(task.id, task);
    }

    const changedTasks: Task[] = [];

    //run over all the new tasks and check if state or order was changed
    for (const group of newChangedTasks) {
        group.tasks.forEach((task: Task, index: number) => {
            const taskBeforeChange: Task = map.get(task.id);

            if (taskBeforeChange.order !== index || taskBeforeChange.status !== group.status) {
                task.status = group.status;
                task.order = index;
                changedTasks.push(task);
            }
        })
    }

    return changedTasks;
}