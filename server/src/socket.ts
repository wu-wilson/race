const io = require('socket.io')(4000, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }
});

io.on('connection', (socket: any) => {
  var users: string[] = [];
  console.log(socket.id);
  socket.on('custom', (user: any, email: any) => {
    console.log(`User is: ${user}`);
    console.log(`Email is: ${email}`);
    // users.push(email);
    // socket.emit('userList', email);
  })
});
