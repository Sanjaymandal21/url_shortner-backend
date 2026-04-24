import { Url } from "../../models/url.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

const viewsOnUrl=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id)

        const existingUrl=await Url.findOne({shortId:id})

        if(!existingUrl){
            return res.status(404).send(new ApiResponse(404,null,"Url not found"))
        }
        // console.log(req.user)

        // if(existingUrl.createdBy != req.user._id){
        //     return res.status(403).send(new ApiResponse(403,null,"you are not allowed to update this url"))
        // }
        res.status(200).send(new ApiResponse(200,{
            views:existingUrl.clicks
        },"Url views fetched sucessfully"))


    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500, error, "Cannot find views for this url"));
    }
}
export default viewsOnUrl
