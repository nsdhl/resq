const io = require("socket.io-client");
const socket = io("http://localhost:4000");
socket.on("notification", (notification) => {
    console.log("Received notification:", notification);


});

socket.on("distance", (data) => {console.log(data)})
setTimeout(() => {
    deleUser()
}, 2000)

function deleUser(){
    socket.emit("delete", { data: "message was deleted" });
}



