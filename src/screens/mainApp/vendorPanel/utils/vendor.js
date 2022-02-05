import axios from "axios"
import { API_VENDOR } from "../../../../../config"

export const getVendor=(props)=>{
    axios.get(`${API_VENDOR}/vendordetail`)
    .then(res=>{
        props.setPhoneNo(res.data.phoneNo);
        props.setName(res.data.name);
        props.setImg(res.data.profileImg);
    })
    .catch(err=>{
        console.log("server error: ",err);
    })
};