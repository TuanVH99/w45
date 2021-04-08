import React from "react";
const defaultImage = "/avatar_default.jpg"

const Avatar = (props) => {
    const {
        src,
        size, onClick
    } = props;
    const sizeMap = {
        avt: 80,
        lg1: 60,
        lg0: 50,
        md: 25,
        sm: 15
    }
    const sizes = size ? sizeMap[size] : sizeMap["lg1"]
    return <img onClick={onClick} className="rounded-circle border"
        style={
            {
                width: sizes,
                height: sizes
            }
        }
        src={src ? src : defaultImage}
        alt="" />
}

export default Avatar