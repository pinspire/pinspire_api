import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// export const localUpload = multer({dest:"/upload"});
// export const pinIconUpload = ({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         relativePath: "/pinspire-api/pins/*"
//     }),
//     preservePath: true
//});

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: "/pinspire-api/pins/*"
    }),
    preservePath: true
});
