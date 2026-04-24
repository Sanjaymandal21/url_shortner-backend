import { Url } from "../../models/url.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import crypto from "crypto";


const generateUniqueId = async () => {
  let existingId = true;
  let uniqueId = crypto.randomBytes(3).toString("hex");


  existingId = await Url.findOne({ shortId: uniqueId });

  if (!existingId) {
    return uniqueId;
  } else {
    return generateUniqueId();
  }
};

const shrinkUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    

    if (!originalUrl) {
      return res.status(400).send(new ApiResponse(400, null, "Field is empty"));
    }
    

    const sid = await generateUniqueId();
    

    const result = await Url.create({
      original: originalUrl,
      shortId: sid,
      createdBy:req.user._id
    });

    

    res
      .status(201)
      .send(new ApiResponse(201, result, "Url successfully shortened"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Cannot short this url"));
  }
};
export default shrinkUrl;
