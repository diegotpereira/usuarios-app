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


// function lerDadosUsuario() {
//     const usuarioListaUI = document.getElementById("usuario-lista")
//     usuariosRef.on("value", snap => {
//         usuarioListaUI.innerHTML = ""
//         snap.forEach(childSnap => {
//             let key = childSnap.key,
//                 value = childSnap.val()
            
//             let $li = document.createElement("li")

//             $li.innerHTML = value.nome 

//             $li.setAttribute("usuario-key", key)
//             $li.addEventListener("click", usuarioClicado)
//             usuarioListaUI.append($li)
//         })
//     })
// }

function lerDadosUsuario() {
    const usuarioListaUI = document.getElementById("usuario-lista")

    usuariosRef.on("value", snap => {

        usuarioListaUI.innerHTML = ""

        snap.forEach(childSnap => {

            let key = childSnap.key, value = childSnap.val()

            let $li =  document.createElement("li")

            // Icone Editar 
            let editarIconUI = document.createElement("span")
            editarIconUI.class = "editar-usuario"
            editarIconUI.innerHTML = " ✎"
            editarIconUI.setAttribute("usuarioid", key)
            editarIconUI.addEventListener("click", editarBtnClicado)

            $li.innerHTML = value.email
            $li.append(editarIconUI)

            $li.setAttribute("usuario-key", key)
            $li.addEventListener("click", usuarioClicado)
            usuarioListaUI.append($li)

        })
   
    })
    // usuariosRef.on("child_added", snap => {
    //     let usuario = snap.val();
    
    //     let $li = document.createElement("li")
    //     $li.innerHTML = usuario.nome
    //     $li.innerHTML = usuario.email
    //     $li.setAttribute("child-key", snap.key)
    //     $li.addEventListener("click", usuarioClicado)
    //     usuarioListaUI.append($li)
    // })
}
// usuariosRef.on("child_added", snap => {
//     let usuario = snap.val();

//     let $li = document.createElement("li")
//     $li.innerHTML = usuario.nome
//     $li.innerHTML = usuario.email
//     $li.setAttribute("child-key", snap.key)
//     $li.addEventListener("click", usuarioClicado)
//     usuarioListaUI.append($li)
// })

function usuarioClicado(e) {
    var usuarioID = e.target.getAttribute("child-key")
    const usuarioRef = bancoDadosRef.child('usuarios/' + usuarioID)
    const usuarioDetalheUI = document.getElementById("usuario-detalhe")

    usuarioDetalheUI.innerHTML = ""
    usuarioRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val()
        usuarioDetalheUI.append($p)
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

    for(let i = 0, len = addUsuarioEntradaUI.length; i < len; i++) {

        let key = addUsuarioEntradaUI[i].getAttribute('data-key')
        let value = addUsuarioEntradaUI[i].value 
        novoUsuario[key] = value 
    }

    usuariosRef.push(novoUsuario)

    // console.log(myPro)
}

// EDITAR USUÁRIO
function editarBtnClicado(e) {
    document.getElementById('editar-usuario-modulo').style.display = "block"

    // definir o ID do usuário para o campo de entrada oculto
    document.querySelector(".editar-usuarioid").value = e.target.getAttribute("usuarioid")

    const usuarioRef = bancoDadosRef.child('usuarios/' +e.target.getAttribute("usuarioid"))

    // definir dados para o campo do usuário
    const editarUsuarioEntradaUI = document.querySelector(".editar-usuario-entrada")

    usuarioRef.on("value", snap => {
        for(var i = 0, len = editarUsuarioEntradaUI.length; i < len; i++) {
            editarUsuarioEntradaUI[i].value = snap.val()[key]
        }
    })
    const salvarBtn = document.querySelector("#editar-usuario-btn")
    salvarBtn.addEventListener("click", salvarUsuarioBtnClicado)
}

function salvarUsuarioBtnClicado(e) {
    const usuarioID = document.querySelector(".editar-usuarioid").value 
    const usuarioRef = bancoDadosRef.child('usuarios', + usuarioID)

    var editarUsuarioObjeto = {

    }

    const editarUsuarioEntradaUI = document.querySelectorAll(".editar-usuario-entrada")

    editarUsuarioEntradaUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key")
        let value = textField.value
        editarUsuarioObjeto[textField.getAttribute("data-key")] = textField.value 
    })

    usuariosRef.update(editarUsuarioObjeto)
    document.getElementById('editar-usuario-modulo').style.display = "none"
}