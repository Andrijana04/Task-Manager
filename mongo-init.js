// mongo-init.js - runs once when container is first created
db = db.getSiblingDB('taskmanager');

db.createUser({
  user: 'taskuser',
  pwd: 'taskpass123',
  roles: [{ role: 'readWrite', db: 'taskmanager' }]
});

db.createCollection('tasks');
db.createCollection('users');

print('MongoDB initialized for Task Manager');
