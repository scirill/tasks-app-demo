# tasks-app-demo

Demo app for kanban boards, It allows creating and edit tasks for multiple boards,
with auto-syncing to the db (using firebase).
Multiple users can use the same boards on different devices at the same time.
How to use:
- To create new task use the '+' button
- For each task once hover over, you will see operations options (move task arrows and delete a task),
  the operations allow to move the task to different section or to delete it completely.  
- To edit task description, double-click on it.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
and then open http://localhost:8080 
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Testing Instructions
```
Test 1
- Open boards page
- Create new Task using '+' button
- Close board page
- Open board again and expect to see new created task.
- Expected Result: you can see the new created task.
```
```
Test 2
- Open boards page
- Create new Task using '+' button
- Move the task to other section (using hover arrow buttons)
- Close board page
- Open board again
- Expected result: task in the new section
```

```
Test 3
- Open boards page
- Create new Tasks using '+' button
- Double clicking on the description
- Change description
- Press 'Cancel' button
- Expected result: text was not changed
```
```
Test 4
- Open boards page
- Create new Tasks using '+' button
- Double clicking on the description
- Change description to 'SOME TEXT'
- Press 'Save' button
- Expected result: description changed to 'SOME TEXT'
- Close the browser
- Open boards page
- Expected result: to see task with description 'SOME TEXT'
```
```
Test 5
- Open boards page at browser 1
- Open boards page at browser 2
- Create new Tasks using '+' button at broswer 1
- Expected result: you see new task on browser 2
- Move task on browser 2 to new section
- Expected result: you see the task moved at browser 1
```
```
Test 6
- Open boards page
- Create new Tasks on Sales board
- Create new Tasks on RnD board
- Make change to both the description and move the task to new sections
- Close board page
- Open board page
- Expeced result: The task are at the same positon before closing 
```
```
Test 7
- Open boards page
- Create 3 new Tasks
- Expeced result: each task added at the end of the existing tasks. 
```
```
Test 8
- Open boards page
- Create new Tasks
- Double click the task to enter edit mode.
- Without changing text move the mouse out of the task are and then move in again
- Expected result: the edit mode of the task reseted (no edit text allowed)  
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
