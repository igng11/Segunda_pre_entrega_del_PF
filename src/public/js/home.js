const socketClient = io(); //instanciando socket del lado del cliente
//este modulo sale de la importacion que se hace en home.hbs

const chatbox = document.getElementById("chatbox");
const chat = document.getElementById("messageLogs")

let user;


// Swal.fire({
//     title: "Identificate",
//     input: "text",
//     text: "Ingresa un nombre de usuario para el chat",
//     inputValidator: (value)=>{
//         if(!value){
//             return "El nombre de usuario es obligatorio"
//         }
//     },
//     allowOutsideClick:false
// //este swal devuelve una promesa
// }).then((result)=>{
//     // cuando el cliente se identifica enviamos ese valor al servidor
//     user = result.value;
//     socketClient.emit("autenticated",`${user} ha iniciado sesion`)
// });

chatbox.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        if(chatbox.value.trim().length>0){//corroboramos que el usuario no envie datos vacios
        socketClient.emit("message",{user:user, message:chatbox.value});
        chatbox.value=""; //borramos el campo
        }
    }
})

socketClient.on("messageHistory",(dataServer)=>{
    let messageElmts="";
    // console.log("dataServer", dataServer);
    dataServer.forEach(item => {
        messageElmts = messageElmts + `${item.user}: ${item.message}<br/>`
    });
    chat.innerHTML = messageElmts;
});
//capturamos la informacion de un nuevo usuario conectado enviada por el servidor y la mostramos en pantala
socketClient.on("newUser",(data)=>{
    if(user){
        //si ya esta autenticado puede recibir notificaciones
        Swal.fire({
            text:data,
            toast:true,
            position: "top-right"
        })
    }
})