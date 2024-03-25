document.getElementById("enviar").addEventListener("click", function () {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (email !== "" && senha !== "") {
        if (email.includes("@") && email.includes(".")) {
            // Email válido, redirecionar para a página de início
           // window.location.href = "inicio.html";
        } else {
            alert("Por favor, insira um email válido.");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});