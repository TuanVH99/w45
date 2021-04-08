import React from "react";
import { Button, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
const imgsrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Chicken_65_%28Dish%29.jpg/1280px-Chicken_65_%28Dish%29.jpg"

function NFDish(props) {
    return (
        <>
            <Card className="" style={{ width: '15rem' }}>
                <Card.Img variant="top" src={imgsrc} />
                <Card.Body>
                    <Card.Title><Link style={{color:"black"}} className="h4" to={`/detail/${props.id}`}>{props.name}</Link></Card.Title>
                    <Card.Text>
                       {props.description}
                    </Card.Text>
                    <Card.Title>
                    <figcaption className="blockquote-footer">
                                    By {props.username} <cite title="Source Title">{(new Date(props.created)).toLocaleString()}</cite>
                                </figcaption></Card.Title>
                    <Button variant="outline-warning">Xem chi tiết</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default NFDish