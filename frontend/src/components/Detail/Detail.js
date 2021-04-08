import React, { useState, useEffect, useContext } from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

import  Avatar  from './Avatar';

const src1 = "https://saodieu.vn/media/Bai%20Viet%20-%20T62016/Saodieu%20-%2010%20mon%20an%201.jpg"

function Detail(props) {
    const { id } = useParams();
    const history = useHistory();
    // const [user, setUser] = useState({})
    const [dish, setDish] = useState({})
    useEffect(() => {
        fetch('http://localhost:5000/detail/' + id).then(res => res.json()).then((result) => {
            setDish(result)
        })
    }, [])
    const handleIngredients = () => {
        const i = dish.ingredients
        if (i) {
            return i.map((item, index) => {
                return (<p key={Math.random()} style={{ borderBottom: "1px dashed black" }} >{item}</p>)
            })
        } else return null

    }
    const handleStep = () => {
        const s = dish.steps
        if (s) {
            return s.map((item, index) => {
                return (<Row className="m-3">
                    <Col xs={1} className="text-center"> <Button variant="secondary" className="rounded-pill">
                        Buoc {index + 1}
                    </Button></Col>
                    <Col xs={11}><p>{item}</p></Col>
                </Row>)
            })


        } else {
            return null
        }
    }
    const handleAuthorUp = () => {
        const a = { ...dish.author }
        if (a) {
            return (<Row>
               <Avatar src={a.avatar} onClick={()=>{history.push('/user/'+a._id)}}/>
                <p className="pl-5"><strong>{a.username}</strong></p>
            </Row>
            )
        } else {
            return null
        }
    }
    const handleAuthor = () => {
        const a = { ...dish.author }
        if (a) {
            return (<>
                <Avatar src={a.avatar}  onClick={()=>{history.push('/user/'+a._id)}} /><br />
                Duoc tao boi tac gia:{a.username}<br />
                {a.description}<br />
                vao ngay:{dish.created}<br />
            </>
            )
        } else {
            return null
        }
    }

    return (
        <div className="pt-5" style={{}}>
            {dish.cover ? (<Image src={dish.cover} className="w-100" />) : (<Image src={src1} className="w-100" />)}


            <br />
            <hr />
            <h3 className="mb-0 h3">{dish.name}</h3>
            <br />
            <Container>
                {handleAuthorUp()}
            </Container>
            <br />
            <p><em>{dish.description}</em></p><br />
            <hr />
            <h3 className="mb-0 h3">Nguyen lieu</h3>
            <Container className="p-3">
                {handleIngredients()}
            </Container>
            <hr />
            <h3 className="mb-0 h3">Cac buoc lam mon:</h3>
            <Container>
                {handleStep()}
            </Container>
            <br />
            <hr />
            <Container className="text-center">
                {handleAuthor()}
            </Container>


        </div>
    )
}
export default Detail