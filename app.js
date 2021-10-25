var configurarfirebase = {
    apiKey: "AIzaSyDogrE49NV3trk_lItcvx0cDxclo65WDes",
    authDomain: "website-ecom-ff223.firebaseapp.com",
    databaseURL: "https://website-ecom-ff223-default-rtdb.firebaseio.com",
    projectId: "website-ecom-ff223",
    storageBucket: "website-ecom-ff223.appspot.com",
    messagingSenderId: "144186283636",
    appId: "1:144186283636:web:209c1d02bf3170d59f6321",
    measurementId: "G-6G4DB0H9WM"
}

firebase.initializeApp(configurarfirebase)

const bancoDadosRef = firebase.database().ref()

const usuariosRef = bancoDadosRef.child('Usuarios');
// const usuarioListaUI = document.getElementById("usuario-lista")

lerDadosUsuario()

function lerDadosUsuario() {
    const usuarioListaUI = document.getElementById("usuario-lista")

    usuariosRef.on("value", snap => {

        usuarioListaUI.innerHTML = ""

        snap.forEach(childSnap => {

            let key = childSnap.key,
                value = childSnap.val()

            let $li = document.createElement("li")

            // Icon Editar 
            let editarIconUI = document.createElement("span")
            editarIconUI.class = "editar-usuario"
            editarIconUI.innerHTML = " ✎"
            editarIconUI.setAttribute("usuarioid", key)
            editarIconUI.addEventListener("click", editarBtnClicado)

            // Icon Deletar
            let deletarIconUI = document.createElement("span")
            deletarIconUI.class = "deletar-usuario"
            deletarIconUI.innerHTML = " X"
            deletarIconUI.setAttribute("usuarioid", key)
            deletarIconUI.addEventListener("click", deletarBtnClicado)

            $li.innerHTML = value.nome
            $li.append(editarIconUI)
            $li.append(deletarIconUI)

            $li.setAttribute("usuario-key", key)
            $li.addEventListener("click", usuarioClicado)
            usuarioListaUI.append($li)

        })

    })
}

function usuarioClicado(e) {
    var usuarioID = e.target.getAttribute("usuario-key")
    const usuarioRef = bancoDadosRef.child('Usuarios/' + usuarioID)
    const usuarioDetalheUI = document.getElementById("usuario-detalhe")

    usuarioRef.on("value", snap => {
        usuarioDetalheUI.innerHTML = ""

        snap.forEach(childSnap => {
            var $p = document.createElement("p");
            $p.innerHTML = childSnap.key + " - " + childSnap.val()
            usuarioDetalheUI.append($p)
        })
    })
}

const addUsuarioBtnUI = document.getElementById("add-usuario-btn")
addUsuarioBtnUI.addEventListener("click", addUsuarioBtnClicado)

// ADICIONAR USUÁRIOS
function addUsuarioBtnClicado() {

    const usuariosRef = bancoDadosRef.child('Usuarios');
    const addUsuarioEntradaUI = document.getElementsByClassName("usuario-entrada")

    let novoUsuario = {

    }

    for (let i = 0, len = addUsuarioEntradaUI.length; i < len; i++) {

        let key = addUsuarioEntradaUI[i].getAttribute('data-key')
        let value = addUsuarioEntradaUI[i].value
        novoUsuario[key] = value
    }

    usuariosRef.push(novoUsuario)

    // console.log(myPro)
}

function deletarBtnClicado(e) {
    e.stopPropagation()

    var usuarioID = e.target.getAttribute("usuarioid")
    const usuarioRef = bancoDadosRef.child('Usuarios/' + usuarioID)

    usuarioRef.remove()
}

// EDITAR USUÁRIO
function editarBtnClicado(e) {
    document.getElementById('editar-usuario-modulo').style.display = "block"

    // definir o ID do usuário para o campo de entrada oculto
    document.querySelector(".editar-usuarioid").value = e.target.getAttribute("usuarioid")

    const usuarioRef = bancoDadosRef.child('Usuarios/' + e.target.getAttribute("usuarioid"))

    // definir dados para o campo do usuário
    const editarUsuarioEntradaUI = document.querySelectorAll(".editar-usuario-entrada")

    usuarioRef.on("value", snap => {
        for (var i = 0, len = editarUsuarioEntradaUI.length; i < len; i++) {

            var key = editarUsuarioEntradaUI[i].getAttribute("data-key")
            editarUsuarioEntradaUI[i].value = snap.val()[key]
        }
    })
    const salvarBtn = document.querySelector("#editar-usuario-btn")
    salvarBtn.addEventListener("click", salvarUsuarioBtnClicado)
}

function salvarUsuarioBtnClicado(e) {
    const usuarioID = document.querySelector(".editar-usuarioid").value
    const usuarioRef = bancoDadosRef.child('Usuarios/' + usuarioID)

    var editarUsuarioObjeto = {

    }

    const editarUsuarioEntradaUI = document.querySelectorAll(".editar-usuario-entrada")

    editarUsuarioEntradaUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key")
        let value = textField.value
        editarUsuarioObjeto[textField.getAttribute("data-key")] = textField.value
    })

    usuarioRef.update(editarUsuarioObjeto)
    document.getElementById('editar-usuario-modulo').style.display = "none"
}