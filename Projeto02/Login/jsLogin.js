document.getElementById("form-login").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-login").value;
    const senha = document.getElementById("senha-login").value;

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioExistente = usuariosSalvos.find(
        (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioExistente) {
        
        localStorage.setItem("usuario", JSON.stringify(usuarioExistente));
        window.location.href = "/Projeto02/Principal/principal.html";
    } else {
        alert("Email ou senha incorretos!");
    }
});