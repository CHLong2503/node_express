import cloudinary from "../configs/cloudinaryConfig.js";

export const uploadImgs = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);

    const uploadedImgs = [];

    for (let image of images) {
      const results = await cloudinary.uploader.upload(image);
      // console.log(results);
      uploadedImgs.push({
        url: results.secure_url,
        publicId: results.public_id,
      });
    }

    return res.status(200).json({
      message: "Uploaded images successfully",
      datas: uploadedImgs,
    });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const removeImgs = async (req, res) => {
  try {
    const publicId = req.params.publicId;
    const results = await cloudinary.uploader.destroy(publicId);

    if (results.result === "not found") {
      throw new Error("Delete image failed!");
    }

    return res.status(200).json({
      message: "Delete image successfully",
    });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
