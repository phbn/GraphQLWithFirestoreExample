import http from 'http'

import app from './server' // Get the express app
import { port } from '../config.json' // Get config file

// Create the server
const server = http.createServer(app)

// Save the current app
let currentApp = app

// Start server
server.listen(port, console.log(`http://localhost:${port}`))

// Enable hot reloading
if (module.hot) {
	module.hot.accept('./server', () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	});
}
