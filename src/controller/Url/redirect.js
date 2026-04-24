

import { Url } from "../../models/url.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

const redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUrl = await Url.findOne({ shortId: id });

    if (!existingUrl) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "Given Id is not present"));
    }

    existingUrl.clicks+= 1;
    await existingUrl.save();

    res.status(302).redirect(existingUrl.original)

  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Cannot short this url"));
  }
};

export default redirectUrl;
