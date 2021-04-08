import React,{useContext} from "react";
import NewDishes from './NewDishes'
import { Carousel, Container } from 'react-bootstrap'

const src1="https://www.lux-review.com/wp-content/uploads/2019/09/7-quirky-catering-ideas-for-corporate-events-1024x576.jpg"
const src2="https://getcooking.ca/wp-content/uploads/2019/03/Team-Building-Events.jpg"
const src3="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZ5bWDTzSq_pINBC0KdYcW_VNC_RXLt7X-g&usqp=CAU"
function Home() {
    return (
        <>
            <Container className="pt-5">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={src1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Tạo menu riêng của bạn</h3>
                            <p>Đăng ký thành viên và tạo ngay menu của bạn!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={src2}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Tham gia cac hoạt động cộng đồng</h3>
                            <p>Tìm kiếm bạn bè và tham dự ngay</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={src3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Tìm kiếm các món ăn</h3>
                            <p>Sự lựa chọn đầy đủ cho mỗi ngày</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <NewDishes />
            </Container>
        </>
    )
}
export default Home