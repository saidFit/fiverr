import axios from "axios";

export const upload = async (file:any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/dahzsvhdd/image/upload`, data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

// export default upload;

export const uploadImages = async (files:any) => {
  const uploadPromises = files.map(async (file:any) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fiverr");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dahzsvhdd/image/upload",
        data
      );

      const { url } = res.data;
      return url;
    } catch (err) {
      console.log(err);
    }
  });

  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (err) {
    console.log(err);
  }
};

// export default uploadImages;