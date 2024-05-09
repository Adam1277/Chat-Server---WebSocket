let  ws = new WebSocket("ws://localhost:8080/WSChatServer-1.0-SNAPSHOT/ws/{roomID}");//Creating a new websocket

//Messaging functionality
ws.onmessage = function (event){
    console.log(event.data);
    let message = JSON.parse(event.data);//Parsing the event data to a variable message to be displayed
    document.getElementById("log").value += "[" + timestamp() + "] " + message.message + "\n";
}

//Joining a existing room via code, and submitted on enter push
document.getElementById("Join").addEventListener("keyup", function(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        enterRoom(event.target.value.trim());
        event.target.value = ""; // Clear the input box after processing
    }
});

//Taking the user messages and sending them to be broadcasted to the chatroom
document.getElementById("input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        let request = {"type":"chat", "msg":event.target.value};
        ws.send(JSON.stringify(request));
        event.target.value = "";
    }
});

//Method to create a new room
function newRoom(){
    // calling the ChatServlet to retrieve a new room ID
    let callURL= "http://localhost:8080/WSChatServer-1.0-SNAPSHOT/chat-servlet";
    //Fetching using a GET method to send the alphanumeric code to the enterRoom function
    fetch(callURL, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
        },
    })
        .then(response => response.text())
        .then(response => enterRoom(response)); // enter the room with the code
}

//Function to handle communicating in a room
function enterRoom(code){
    if (ws) {
        ws.close();  // Close existing WebSocket connection if open
    }
    document.getElementById("log").value = "";//To clear the ChatLog from previous rooms

    //To display the list of Rooms created, so they are visible
    const dochead = document.createElement('ul');
    dochead.textContent = code;
    dochead.style.color = "black";
    document.getElementById('ChatList').appendChild(dochead);

    //Creating a new Websocket with the room code
    ws = new WebSocket("ws://localhost:8080/WSChatServer-1.0-SNAPSHOT/ws/" + code);

    //To clear the prompt
    document.getElementById("Prompt").innerHTML = "";

    //Displaying the current room "You are chatting in room " + code
    const prompthead = document.createElement("h3");
    prompthead.textContent = "You are chatting in room " + code;
    prompthead.style.color = "white";
    document.getElementById("Prompt").appendChild(prompthead);

    //Messaging functionality mostly from the server
    ws.onmessage = function (event) {
        console.log(event.data);
        let message = JSON.parse(event.data);
        document.getElementById("log").value += "[" + timestamp() + "]" + message.message + "\n";
    };

    //To catch errors
    ws.onerror = function (event) {
        console.error("WebSocket error observed:", event);
    };

    //To display the closing of the Websocket
    ws.onclose = function (event) {
        console.log("WebSocket is closed now.");
    };
}

//To clear all the rooms on the left side of the UI
function refresh() {
    const chatarea = document.getElementById("ChatList");//Grab the Chatlist html element
    chatarea.innerHTML = ""; // Clear all existing list items from the chat list
}

//To return the time for usage in the textbox
function timestamp(){
    let d = new Date(), minutes = d.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return d.getHours() + ':' + minutes;
}


