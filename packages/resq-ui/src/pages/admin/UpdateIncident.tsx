import * as React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { url } from "../../axios";
import { toast } from "react-hot-toast";
import '../../App.css';

export default function UpdateIncident({title, description, id, setOpen, fetchIncident}){
    const [data, setData] = useState({
        title:'',
        description:'',
        id:''
    })
    const updateIncident = async () => {

try{      const result =   await url.put(`/incident/${data.id}`, {
            title: data.title,
            description: data.description
        
});
        toast.success("Incident Updated Successfully");
        setOpen(false);
        fetchIncident();
    }
    catch(err){
        console.log(err);
    }

    }


      React.useEffect(() => {
        setData({title, description, id})
      },[])
    console.log(id);
    return (
        <>
        <div style={{height:'400px', width:'350px', display:'flex', position:'absolute', background:'white', flexDirection:'column', alignItems:"center", justifyContent:"center", right:'40%', zIndex:1}}>
        <form action="" style={{justifyContent:"center", display:"flex", flexDirection:"column", gap:"30px", position:'relative'}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={data.title} onChange={(e)=>setData({...data, title:e.target.value})}/>
        <TextField id="outlined-basic" label="Description" variant="outlined" value={data.description} onChange={(e)=>setData({...data, description:e.target.value})}/>
        <Button variant="contained" style={{background:"#00BFA6", color:"white"}} onClick={updateIncident}>Update</Button>
        </form>
        </div>
        <div className="drop-shadow" onClick={()=>setOpen(false)}>
        </div>
        </>
    )
}

