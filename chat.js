var firebaseConfig = {
  // Your Firebase configuration goes here
  apiKey: "AIzaSyAzMFegDdgSM8gsCmZtMdMFLlGqv_cRPOQ",
  authDomain: "fire-chat-sai.firebaseapp.com",
  databaseURL: "https://fire-chat-sai-default-rtdb.firebaseio.com/",
  projectId: "fire-chat-sai",
  storageBucket: "fire-chat-sai.appspot.com",
  messagingSenderId: "1034963106910",
  appId: "1:1034963106910:web:923d259f21adc2a53988cf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();

// Get a reference to the message list element
var messageList = document.getElementById("message-list");

// Listen for new messages in the Firebase database
database.ref("messages").on("child_added", function(snapshot) {
  var message = snapshot.val();
  var li = document.createElement("li");
  li.textContent = message.text;
  messageList.appendChild(li);
});

// Get a reference to the message input field and form
var messageInput = document.getElementById("message-input");
var messageForm = document.getElementById("message-form");

// Listen for new messages to be submitted
messageForm.addEventListener("submit", function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the message text and current timestamp
  var text = messageInput.value;
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