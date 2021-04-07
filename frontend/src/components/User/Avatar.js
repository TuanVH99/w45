import React from 'react';
const defaultImage = process.env.PUBLIC_URL + "/avatar_default.jpg"

function Avatar(props) {
    const { src, size } = props
    const sizehMap = {
        lg: 40,
        md: 25,
        sm: 15,
    }
    const sizeInPixel = size ? sizehMap[size] : sizehMap["lg"]
    return (
        <img className="rounded-circle border" style={{ width: sizeInPixel, height: sizeInPixel }} src={src ? src : defaultImage} alt="" />
    )
}

export default Avatar