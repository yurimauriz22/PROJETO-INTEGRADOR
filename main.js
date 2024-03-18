  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAuth ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyB_A7ce7rxbD6QR1k8MtxxmiERBGb3bQz0",
    authDomain: "space-calm.firebaseapp.com",
    projectId: "space-calm",
    storageBucket: "space-calm.appspot.com",
    messagingSenderId: "236518444248",
    appId: "1:236518444248:web:51847e2f757d9a8c489bad",
    measurementId: "G-ND4YSRH202"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-bnt");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href = "./inicio.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  
})