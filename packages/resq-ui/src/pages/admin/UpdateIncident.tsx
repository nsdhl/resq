import * as React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function UpdateIncident(props){
    const [data, setData] = useState({
        title:'',
        description:'',
        id:''
    })
    return (
        <>
        <div style={{height:'400px', width:'350px', display:'flex', position:'absolute', background:'white', flexDirection:'column', alignItems:"center", border:'2px solid black', justifyContent:"center", right:'40%'}}>
        <form action="" style={{justifyContent:"center", display:"flex", flexDirection:"column", gap:"30px"}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={props.title}/>
        <TextField id="outlined-basic" label="Description" variant="outlined" value={props.description}/>
        </form>
        </div>
        </>
    )
}