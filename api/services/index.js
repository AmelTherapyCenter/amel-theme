import { Router } from "express";
// import { storeAllImages } from "../../utils.js";

const router = Router()

// Store all images
// router.get("/store-all", storeAllImages);

// export const storeAllImages = async (req, res) => {
//     try {
//         const imgFiles = readdirSync("./images");

//         const promises = imgFiles.map(async (file) => {

//             const b64 = Buffer.from(`./images/${file}`).toString('base64');

//             await client.data.creator()
//                 .withClassName("Image")
//                 .withProperties({
//                     image: b64,
//                     text: file.split(".")[0].split("_").join(" ")
//                 })
//                 .do();
//         });

//         await Promise.all(promises);

//         res.status(200).send("Images were stored");

//     } catch (err) {
//         console.error(err)
//         res.status(400).send("There was an error");
//     }
// }

export default router;