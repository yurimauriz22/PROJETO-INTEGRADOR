const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB_A7ce7rxbD6QR1k8MtxxmiERBGb3bQz0",
    authDomain: "space-calm.firebaseapp.com",
    projectId: "space-calm",
    storageBucket: "space-calm.appspot.com",
    messagingSenderId: "236518444248",
    appId: "1:236518444248:web:51847e2f757d9a8c489bad",
    measurementId: "G-ND4YSRH202"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

//função de inscrição
const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    console.log(email, password)
    // firebase code
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      // Signed in 
        alert("você está inscrito");
        console.log(result);
       
      // ...
    })
    .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      // ..
    });
}

//signIn function
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    //firebase code
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in
    alert("você está conectado");
      console.log(result);
      window.location.href = "inicio.html";
    // ...
  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message);
    alert("usuario não encontrado ou senha errada");
  });
}