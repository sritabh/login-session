 // Your web app's Firebase configuration
 //pull request by anusha
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
  var auth = null;
  var errors = null;


  var users = firebase.database().ref("USERS");

  
function showError(error) {
  document.getElementById("error_bar").style.display = "block";
  document.getElementById("error").innerHTML = error;
  if (document.getElementById("error_bar").style.display != "none") {
    setTimeout(()=>{
      document.getElementById("error_bar").style.display = "none";
    },3000) 
  }
}
function onSignup() {
  //alert("Holee cow");
  var data = {
    username : document.getElementById("signup_username").value,
    password : document.getElementById("signup_password").value,
  };
  
  //Signup case
  firebase.auth().createUserWithEmailAndPassword(data.username, data.password).then(function(user) {
    auth = user;
    console.log(user.uid);
  }).then(function(){
    users.push({
      "USERNAME": data.username,
      "PassWord": data.password,
    });
  }).then(resetForm())
 .catch(function (error) {
   // Handle errors
   showError(error)
   console.log(error);
 });
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
        })
        .catch(function(error) {
          errors = error;
          showError(error)
          console.log("Login Failed!", error);
})
}
//Reset form or add different function since on default reloading will not create user
function resetForm() {
  document.getElementById("signUpForm").style.display = "none";
}
//Check Whether user is logged in aur not
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User logged in already or has just logged in.
    document.getElementById("loginState").innerHTML = "User:Logged In!";
    document.getElementById("login").style.display = "none"
    auth = user;
    console.log("Uid printing");
    console.log(user.uid);
  } else {
    document.getElementById("loginState").innerHTML = "User: Not Logged In!";
    //document.getElementById("dataDetails").innerHTML = "is this working" + document.getElementById("login_email").value;
    document.getElementById("login").style.display = "block";
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
    users.child(auth.uid).set({
      "Name": data.name,
      "About": data.about,
    });
}
///Showing login form to login on demand
// Show data form and signup form on demand
function showLoginForm() {
  //console.log(auth.uid);
                
  if (auth != null) {
    document.getElementById("login").style.display = "none";
    var error = "User is ALready Signed In"
    showError(error)
  };
  if (document.getElementById("login").style.display != "none") {
    document.getElementById("login").style.display = "none";
  }
  
  else {
    document.getElementById("login").style.display = "block";
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("dataForm").style.display = "none";
  }
  

}
function showSignupForm() {
  if (auth != null)  {
    var error = "You're already signed in<br>Logout to create new account";
    showError(error);
  }
  else {
      if (document.getElementById("signUpForm").style.display != "none") {
        document.getElementById("signUpForm").style.display = "none";
       }
      else {
        document.getElementById("signUpForm").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("dataForm").style.display = "none";
  }
}
}
function showDataForm() {         
  if (document.getElementById("dataForm").style.display != "none") {
    document.getElementById("dataForm").style.display = "none";
  }
  else {
    document.getElementById("dataForm").style.display = "block";
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("login").style.display = "none";
  };
  if (auth == null) {
    document.getElementById("dataForm").style.display = "none";
    var error = "You Need to login First";
    showError(error)
  }

}

//making sure user logsout
function logout() {
  firebase.auth().signOut().then(function(user){
    document.getElementById("profile").style.display = "none";
    document.getElementById("dataForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "none";
    auth = null;
  }).catch(function(error) {
    errors = error;
    showError(error)
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
  }
  
};
//Closing Error Button Just for Temp work
function closeError() {
  document.getElementById("error_bar").style.display = "none";
};
//GettingData back from firebase database
function showProfile() {
  if (document.getElementById("profile").style.display != "none") {
    document.getElementById("profile").style.display = "none";
  }
  else {
    document.getElementById("profile").style.display = "block";
    document.getElementById("dataForm").style.display = "none";
  }
  if (auth != null) {
    var user = firebase.database().ref("USERS/" + auth.uid);
    user.on("value",getData,getError);
    function getData(data) {
    var userData = data.val();
    document.getElementById("profile").style.display = "block";
    document.getElementById("dataForm").style.display = "none";
    if (userData != null) {
      document.getElementById("profile").innerHTML = '<h1>Your Profile Data is:</h1><br><p>Name: ' +userData["Name"]+ '</p><p>About:' +userData["About"]+ '</p>';
    }
    

    //console.log(userData["Name"]);
}
function getError(error) {
  console.log(error);
}

}
  else {
    document.getElementById("profile").style.display = "none";
    var error = "You Need to login First";
    showError(error)
  }
};
