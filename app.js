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
const usuarioListaUI = document.getElementById("usuarioLista")

usuariosRef.on("child_added", snap => {
    let usuario = snap.val();

    let $li = document.createElement("li")
    $li.innerHTML = usuario.nome
    $li.innerHTML = usuario.email
    $li.setAttribute("child-key", snap.key)
    $li.addEventListener("click", usuarioClicado)
    usuarioListaUI.append($li)
})

function usuarioClicado(e) {
    var usuarioID = e.target.getAttribute("child-key")
    const usuarioRef = bancoDadosRef.child('usuarios/' + usuarioID)
    const usuarioDetalheUI = document.getElementById("usuarioDetalhe")

    usuarioDetalheUI.innerHTML = ""
    usuarioRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val().usuarioDetalheUI.append($p)
    })
}