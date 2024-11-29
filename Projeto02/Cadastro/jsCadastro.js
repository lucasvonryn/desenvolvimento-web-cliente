document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;

    const usuario = {
        email: email,
        senha: senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "/Projeto02/Login/login.html"; 
});