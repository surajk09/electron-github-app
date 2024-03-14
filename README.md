Electron App with electron-log
This is a simple Electron app that demonstrates how to use electron-log to log events to a file.

Installation
Clone the repository and install dependencies:

bash
Copy code
git clone https://github.com/your-username/your-electron-app.git
cd your-electron-app
npm install
Usage
To run the app:

bash
Copy code
npm start
The app will start, and you should see log messages in the console and a log file (app.log) in the user data directory.

Logging
The app uses electron-log to log events. You can log messages using different log levels:

log.info('message'): Log an information message.
log.warn('message'): Log a warning message.
log.error('message'): Log an error message.
Log File Location
The log file (app.log) is located in the user data directory:

Windows: C:\Users\YourUsername\AppData\Roaming\YourAppName\app.log
Mac: /Users/YourUsername/Library/Application Support/YourAppName/app.log
Linux: /home/YourUsername/.config/YourAppName/app.log
License
This project is licensed under the MIT License - see the LICENSE file for details.
