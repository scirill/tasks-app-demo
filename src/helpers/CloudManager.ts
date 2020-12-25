import {db} from '@/db';

/**
 * Cloud controller to update the db with changes
 */
export class CloudManager {

    private collection: any;

    public setCollection(collection: string) {
        this.collection = db.collection(collection);
    }

    public async addNewTask(status: number, order: number, description: string): Promise<string> {
        const newTask = {
            description,
            status,
            order,
            timeCreated: Date.now(),
        }
        const newDoc = await this.collection.add(newTask);
        return newDoc.id;
    }

    public removeTask(id: string): Promise<void> {
        return this.collection.doc(id).delete();
    }

    public updateStatus(id: string, status: number, order: number) {
        return this.collection.doc(id).update({
            status,
            order
        })
    }

    public updateDescription(id: string, description: string) {
        return this.collection.doc(id.toString()).update({
            description
        })
    }
}

