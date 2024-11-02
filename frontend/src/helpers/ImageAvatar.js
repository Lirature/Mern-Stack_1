const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const ImageAvatar = async(image) =>{
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","ShopA_Avatar")

    const reponese = await fetch(url, {
        method:"Post",
        body:formData,
    })
    return reponese.json()
}

export default ImageAvatar