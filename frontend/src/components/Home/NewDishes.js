import React, { useEffect, useState } from "react";
import { Button, Badge, Container, Spinner } from 'react-bootstrap';
import NFDish from "./NFDish";


function NewDishes() {
    const [news, setNews] = useState([])
    const [newjsx, setNewjsx] = useState(null)

    const loadNews = () => {
        fetch("http://localhost:5000/get-4/" + news.length).then(res => res.json()).then((results) => {
            setNews(news.concat(results));
            handleLoad(news.concat(results), 4)
        })

    }
    const handleLoad = (array, n) => {
        let tmp = [...array]
        const result = new Array(Math.ceil(tmp.length / n)).fill().map(_ => tmp.splice(0, n))
        const final = (result.map((item) => {
            return (
                <Container key={Math.random()} className="mt-3 mb3 d-flex justify-content-between">
                    {item.map((d) => {
                        return <NFDish key={d._id} id={d._id} name={d.name} description={d.description} created={d.created} />
                    })}
                </Container>
            )
        }))
        console.log(final)
        setNewjsx(final)
    }
    useEffect(() => {
        fetch("http://localhost:5000/get-4/0").then(res => res.json()).then((results) => {
            setNews(results);
            handleLoad(results, 4)
        })
    }, [])

    return (
        <>
            <h4 className="mt-5">Mon an moi <Badge variant="danger">New</Badge></h4>
            <hr />

            {newjsx == null ? <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="secondary" />
            </div>
                : newjsx}
            <div className="text-center m-3">
                <Button onClick={loadNews}>Tai them mon nua....</Button>
            </div>
            <hr />
            <Container className=" mt-5 d-flex justify-content-between">
                top mon an dc yeu thich nhat
            </Container>
            <hr />
            <Container className=" mt-5 d-flex justify-content-between">
                top nguoi dung
            </Container>

        </>
    )
}

// class NewDishes extends React.Component {
//     state = {
//         news: [],
//         newjsx: null
//     }

//     loadNews = () => {
//         fetch("http://localhost:5000/get-4/" + this.state.news.length).then(res => res.json()).then((results) => {
//             this.setState({
//                 news: this.state.news.concat(results)
//             })
//         })
//         this.handleLoad(this.state.news, 4)
//     }
//     handleLoad = (array, n) => {
//         let tmp = [...array]
//         const result = new Array(Math.ceil(tmp.length / n)).fill().map(_ => tmp.splice(0, n))
//         const final = (result.map((item) => {
//             return (
//                 <Container className="mt-3 mb3 d-flex justify-content-between">
//                     {item.map((d) => {
//                         return <NFDish key={d._id} name={d.name} description={d.description} created={d.created} />
//                     })}
//                 </Container>
//             )
//         }))
//         console.log(final)
//         this.setState({
//             newjsx: final
//         })
//     }
//     componentDidMount() {
//         fetch("http://localhost:5000/get-4/0").then(res => res.json()).then((results) => {
//             this.setState({
//                 news:results
//             });

//         }).then(() => { this.handleLoad(this.state.news, 4) })
//     }

//     render() {
//         return (
//             <>
//                 <h4 className="mt-5">Mon an moi <Badge variant="danger">New</Badge></h4>
//                 <hr />
//                 { this.state.newjsx}
//                 <div className="text-center m-3">
//                     <Button onClick={this.loadNews}>Tai them mon nua....</Button>
//                 </div>
//                 <hr />
//                 <Container className=" mt-5 d-flex justify-content-between">
//                     top mon an dc yeu thich nhat
//             </Container>
//                 <hr />
//                 <Container className=" mt-5 d-flex justify-content-between">
//                     top nguoi dung
//             </Container>
//             </>
//         )
//     }
// }

export default NewDishes
