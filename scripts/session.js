
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCx_PaXJBTgx-3lzKNoOk0m0mFmRtbc6tQ",
  authDomain: "login-session-a9776.firebaseapp.com",
  databaseURL: "https://login-session-a9776.firebaseio.com",
  projectId: "login-session-a9776",
  storageBucket: "login-session-a9776.appspot.com",
  messagingSenderId: "618352431086",
  appId: "1:618352431086:web:695635e64fd15b941708ff",
  measurementId: "G-QE6JZGJD7P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var signupForm = document.getElementById("signupForm");
  var dataForm = document.getElementById("dataForm");
  var auth = null;
  var errors = null;


  var users = firebase.database().ref("USERS");

  

function onSignup() {
  //alert("Holee cow");
  var data = {
    username : document.getElementById("signup_username").value,
    password : document.getElementById("signup_password").value,
    name : document.getElementById("name").value
  };
  
  //Signup case
  firebase.auth().createUserWithEmailAndPassword(data.username, data.password).then(function(user) {
    auth = user;
    console.log(user.uid);
  }).then(function(){
    users.push({
      "USERNAME": data.username,
      "PassWord": data.password,
      "Name": data.name,
    });
  }).then(resetForm()).then(hideError())
 .catch(function (err) {
   // Handle errors
   errors = err;
   document.getElementById("error").innerHTML = err;
   console.log(err);
 });
 if( auth != null ){
 alert("hurray authentication");
}
}
function onLogin() {
  document.getElementById("login").style.display = "none";
  var data = {
    loginEmail : document.getElementById("login_email").value,
    loginPassword : document.getElementById("login_password").value,
  };
  firebase.auth().signInWithEmailAndPassword(data.loginEmail, data.loginPassword)
        .then(function(authData) {
          auth = authData;
          //alert("loggedIn success");
          console.log("logged in Success")
          console.log(authData.uid);
        }).then(hideError()).then(function(){document.getElementById("dataForm").style.display = "block";})
        .catch(function(error) {
          errors = error;
          document.getElementById("error").innerHTML = error;
          console.log("Login Failed!", error);
})
}
//Reset form or add different function since on default reloading will not create user
function resetForm() {
  signUpForm.reset()
}
//Check Whether user is logged in aur not
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User logged in already or has just logged in.
    auth = user;
    //console.log("Uid printing");
    //console.log(user.uid);
  } else {
    // User not logged in or has just logged out.
  }
});
/////////
function onSubmitData(userId) {
  
  var data = {
    name : document.getElementById("name_text").value,
    about : document.getElementById("about_text").value,
  };
    alert("Data Submitted");
    console.log(auth.uid);
    users.child(auth.uid).push({
      "Name": data.name,
      "About": data.about,
    });
}
///Showing login form to login
function showLoginForm() {
  console.log("login butt")
  //console.log(auth.uid);
                
  if (document.getElementById("login").style.display != "none") {
    document.getElementById("login").style.display = "none";
  }
  else {
    document.getElementById("login").style.display = "block";
  }

}
// Show data form and signup form on demand
function showSignupForm() {
                
  if (document.getElementById("signupForm").style.display != "none") {
    document.getElementById("signupForm").style.display = "none";
  }
  else {
    document.getElementById("signupForm").style.display = "block";
  }

}
function showDataForm() {         
  if (document.getElementById("dataForm").style.display != "none") {
    document.getElementById("dataForm").style.display = "none";
  }
  else {
    document.getElementById("dataForm").style.display = "block";
  }

}
//making sure user logsout
function logout() {
  firebase.auth().signOut().then(function(user){
    alert("logged out");
    auth = null;
  }).then(hideError()).catch(function(error) {
    errors = error;
    document.getElementById("error").innerHTML = error;
    console.log(error);
  });
  }
  
//checking user
function prInt() {
  if (auth != null) {
    console.log(auth.uid);
  }
  else {
    console.log("U need to login");
    document.getele
  }
  
};
//hide the error just temp wprk
function hideError() {
  if (error == null) {
    document.getElementById("error").style.display = "none";
  }
}
  