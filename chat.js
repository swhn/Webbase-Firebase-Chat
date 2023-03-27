// Get references to HTML elements
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");
var messageList = document.getElementById("messages");

// Get a reference to the Firebase database
var database = firebase.database();

// Set up a listener to listen for new messages
database.ref("messages").on("child_added", function(snapshot) {
  var message = snapshot.val();
  var li = document.createElement("li");
  li.textContent = message.text;
  messageList.appendChild(li);
});

// Handle form submission
messageForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var text = messageInput
// Get the current date and time
var now = new Date();
var timestamp = now.toLocaleString();

// Save the message to the database
database.ref("messages").push({
text: text,
timestamp: timestamp
});

// Clear the input field
messageInput.value = "";
});

// Clear the message list when the page loads
window.onload = function() {
messageList.innerHTML = "";
};