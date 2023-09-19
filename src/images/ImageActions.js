import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImageToStorage = (file, uploadRef) => {
    return new Promise(async (resolve) => {
        const storage = getStorage();

        const metadata = {
            contentType: `image/${file.type}`
        };

        const storageRef = ref(storage, `${uploadRef}/` + file.name);
        const uploadTask = await uploadBytesResumable(storageRef, file.self, metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    resolve({
                        name: file.name,
                        src: downloadURL
                    });
                });
            })
    })
}