// Get references to HTML elements
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");
var messageList = document.getElementById("messages");

<<<<<<< HEAD
firebase.initializeApp(config);

var currentUser = null;
var fileInput = document.getElementById("file-input");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    currentUser = user;
    document.getElementById("user-name").innerText = currentUser.displayName;
    loadMessages();
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
});

function loadMessages() {
  firebase
    .database()
    .ref("messages")
    .on("child_added", function (snapshot) {
      var data = snapshot.val();
      displayMessage(snapshot.key, data.name, data.text, data.imageUrl);
    });
}

function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var image = fileInput.files[0];

  if (image) {
    var storageRef = firebase.storage().ref("images/" + image.name);
    var uploadTask = storageRef.put(image);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Track upload progress if necessary
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          firebase
            .database()
            .ref("messages")
            .push({
              name: currentUser.displayName,
              text: "",
              imageUrl: downloadURL,
            })
            .catch(function (error) {
              console.error("Error writing new message to Firebase Database", error);
            });
        });
      }
    );
  } else {
    firebase
      .database()
      .ref("messages")
      .push({
        name: currentUser.displayName,
        text: messageInput.value,
      })
      .catch(function (error) {
        console.error("Error writing new message to Firebase Database", error);
      });
  }

  messageInput.value = "";
  fileInput.value = "";
}

function displayMessage(key, name, text, imageUrl) {
  var messageList = document.getElementById("message-list");
  var messageElement = document.createElement("div");
  messageElement.classList.add("message");

  if (imageUrl) {
    var imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    messageElement.appendChild(imageElement);
  }

  var nameElement = document.createElement("span");
  nameElement.innerText = name;
  messageElement.appendChild(nameElement);

  var textElement = document.createElement("span");
  textElement.innerText = text;
  messageElement.appendChild(textElement);

  messageList.appendChild(messageElement);
  messageList.scrollTop = messageList.scrollHeight;
}

var sendMessageButton = document.getElementById("send-message-button");
sendMessageButton.addEventListener("click", function (event) {
  event.preventDefault();
  sendMessage();
});
=======
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
>>>>>>> parent of 4911528 (fix errors)
