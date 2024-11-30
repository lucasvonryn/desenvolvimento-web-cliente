document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const emailExistente = usuariosSalvos.find(usuario => usuario.email === email);

    if (emailExistente) {
        alert("E-mail já cadastrado.");
        return;
    }

    const usuario = {
        email: email,
        senha: senha
    };

    usuariosSalvos.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "/Projeto02/Login/login.html";
});