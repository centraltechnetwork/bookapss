//import http module to enable you create a new server
import http from 'http'; 

//create a new server and store it in a variable
const server = http.createServer((req, res) => {
  res.statusCode = 200;  // HTTP status code for success
  res.setHeader('Content-Type', 'text/plain');  // Set response type to plain text
  res.end('Welcome to my e-library server ');  // Send response

});
//set a port for the server to listen on\\
server.listen(5000, '127.0.0.1', () => {
  console.log('Server is running at http://127.0.0.1:5000/');
});
