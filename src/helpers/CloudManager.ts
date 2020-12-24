import {db} from '@/db';

export class CloudManager {

    private collection: any;
    constructor(collection: string) {
        this.collection = db.collection(collection);
    }

    public addNewTask(status: number): Promise<any> {
        const newTask = {
            description: 'New Task',
            timeCreated: Date.now(),
            status,
        }
        return this.collection.add(newTask);
    }

    public removeTask(id: string): Promise<any> {
        return this.collection.doc(id).delete();
    }

    public updateStatus(id: string, status: number) {
        return this.collection.doc(id).update({
            status
        })
    }

    public updateDescription(id: string, description: string) {
        return this.collection.doc(id).update({
            description
        })
    }
}

