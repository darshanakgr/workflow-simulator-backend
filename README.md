# Real-time Workflow Simulator
A chained task requires many subtasks to be chained together to form a more complex workflow or in simple terms a job. This progress of these tasks is the input of this system and the output will be the automated notifications of the real-time progress of the tasks which can be referenced through an API. This project provides a web service and an javascript-based library to get the above functionalities.


# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Clone the repository
```
git clone --depth=1 git remote add origin https://github.com/drox2014/workflow-simulator-ts.git
```
- Install dependencies
```
cd workflow-simulator-ts
npm install
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm run build
npm start
```
Navigate to `http://localhost:3000`
