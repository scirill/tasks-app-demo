import { expect } from 'chai'
import {CloudManager} from '@/helpers/CloudManager';
import {db} from '@/db';

const TEST_COLLECTION = 'BoardsTest/Test/Tasks';

describe('Cloud Manager Tests',  function() {

  const cloudManger = new CloudManager();
  cloudManger.setCollection(TEST_COLLECTION);

  it('Test - add task', async function () {
    this.timeout(10000);

    const description = 'TEST TASK';
    const status = 1;
    const id = await cloudManger.addNewTask(status, description);

    const docRef = await db.collection(TEST_COLLECTION).doc(id).get();
    const doc = docRef.data() as Task;

    expect(docRef.id).to.equal(id);
    expect(doc.description).to.equal(description);
    expect(doc.status).to.equal(status);
  })

  it('Test - remove task', async function () {
    this.timeout(10000);

    const id = await cloudManger.addNewTask(0, 'TEST');
    await cloudManger.removeTask(id);
    const docRef = await db.collection(TEST_COLLECTION).doc(id).get();
    expect(docRef.data()).to.equal(undefined);
  })

  it('Test - update status', async function () {
    this.timeout(10000);

    const newStatus = 5;

    const id = await cloudManger.addNewTask(0, 'TEST');

    await cloudManger.updateStatus(id, newStatus);
    const docRef = await db.collection(TEST_COLLECTION).doc(id).get();
    const doc = docRef.data() as Task;
    expect(doc.status).to.equal(newStatus);
  })

  it('Test - update description', async function () {
    this.timeout(10000);

    const newDescription = 'NEW DESCRIPTION';
    const id = await cloudManger.addNewTask(0, 'TEMP');

    await cloudManger.updateDescription(id, newDescription);
    const docRef = await db.collection(TEST_COLLECTION).doc(id).get();
    const doc = docRef.data() as Task;
    expect(doc.description).to.equal(newDescription);
  })
})
