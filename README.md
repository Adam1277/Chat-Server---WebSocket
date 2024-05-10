# Chat-Server---WebSocket
Web Socket project based on Client-Server technologies.

![image](https://github.com/Adam1277/Chat-Server---WebSocket/assets/114250621/1f76bce8-4340-411c-8ce7-b139873c8292)

## Project Information:
The Chat Server is a real-time communication application that allows multiple users to join and interact in different chat rooms. Each chat room is accessed through a unique random alphanumeric code, and users can create new rooms, join existing ones, or refresh the list to see updated room information.

## Team members:
Adam Levere <br>
Alejandra Belda Manrique
Muhammad Jibran Khan

## Improvements:
Added a "Clear Chat Rooms" button to the interface, allowing users to clear out the list of chat rooms displayed on the left side of the chatroom interface to prevent clutter.

## How to run:
Run your Machines IntelliJ as an administrator
Clone the repo into a local folder on your machine
Ensure all files are in appropriate folders (main.js in the js folder, styles.css in the css folder etc...)
Import all necessary photos
Open the project in IntelliJ
Go to Run -> Edit Configurations
Fill in glassfish server, choice of browser, use this URL http://localhost:8080/WSChatServer-1.0-SNAPSHOT/ws
Select domain1 as the domain
Go to deployment tab, deploy artifact abd select WSChatServer:war exploded!
Now run the glassfish server using green button at the top right
Navigate to index.html and open with browser of choice
Now the chat room should be open and functioning, feel free to use any of the functionalities (create new chat rooms, join chat rooms, talk)

