document.getElementById("form-login").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-login").value;
    const senha = document.getElementById("senha-login").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioSalvo && email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
        window.location.href = "/Projeto02/Principal/principal.html"; 
    } else {
        alert("Email ou senha incorretos!");
    }
});