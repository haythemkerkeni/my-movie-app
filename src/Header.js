import React from "react"

const Service = (props) => {
    return (
        <div className={props.element}>
            <p  >{props.element.star}</p>
            <img  src={props.element.img} alt=""></img>
            <h4  >{props.element.title}</h4>

        </div>
    )
}
export default Service