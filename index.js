// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBwKvb-B9G2wPSOk3LTS0rCk30yCAR8IqA",
  authDomain: "sih2020-afa03.firebaseapp.com",
  databaseURL: "https://sih2020-afa03.firebaseio.com",
  projectId: "sih2020-afa03",
  storageBucket: "sih2020-afa03.appspot.com",
  messagingSenderId: "669320075448",
  appId: "1:669320075448:web:f4426a5fab8a97d0713c4d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user) {
      window.location = "welcome.html";
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error: " + errorMessage);
    });
}

function register() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass1").value;
  if (
    document.getElementById("pass1").value ==
    document.getElementById("pass2").value
  ) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
      });

    if (
      window.confirm(
        "Registration  Successful, verify your email to continue . " + email
      )
    ) {
      var user = email;
      firebase.auth().onAuthStateChanged(function(user) {
        user.sendEmailVerification();
      });
    }
  } else {
    window.alert("Passwords do not match !");
  }
}

function logout() {
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome: " + email_id;
    }
  }
});

function redeem() {
  // var token = document.getElementById("token").value;

  // if (token == "AH153XW015") {
  //   window.alert("Congratulation Entered Token is correct");
  //   window.location = "congratulation.html";
  // } else {
  //   window.alert(
  //     "Entered Token is wrong.Please Verify the token entered once again"
  //   );
  // }

  var ref = firebase.database().ref("tokens");
  ref.on("value", getdata);
}

function getdata(data) {
  var flag = 0;
  var q = data.val();
  //console.log(q);
  var keys = Object.keys(q);
  //console.log(keys);
  var code = new Array();
  var weight = new Array();
  var tokens = document.getElementById("token").value;
  //console.log(tokens);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    code[i] = q[k].code;
    //console.log(code[i]);
    weight[i] = q[k].weight;
    //console.log(weight[i]);

    if (tokens == code[i]) {
      flag = 1;
      break;
    }
  }
  if (flag == 1) {
    window.alert("Congratulation Your code is correct");
    window.location = "congratulation.html";
  } else {
    window.alert("Error in code");
  }
}

function rewards() {
  window.location = "rewards.html";
}
