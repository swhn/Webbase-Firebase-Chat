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
