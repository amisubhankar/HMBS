import React from 'react'
import img1 from '../image/grand.jpg'
import img2 from '../image/itcroyal.png'
import img3 from '../image/umaidpalace.jpg'
import img4 from '../image/tajpalace.jpeg'
import { Carousel } from 'react-bootstrap'

function MyCarousel() {
    return (
        <div className='container-fluid my-3'>
            <center>
                <Carousel style={{ width: '100%', height: '600px' }}>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block"
                            style={{ width: '100%', height: '550px' }}
                            src={img1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Grand Hotel </h3>
                            <p>Kolkata</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block"
                            style={{ width: '100%', height: '550px' }}
                            src={img3}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Umaid Palace</h3>
                            <p>Jodhpur</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block"
                            style={{ width: '100%', height: '550px' }}
                            src={img2}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>ITC Royal</h3>
                            <p>Kolkata</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block"
                            style={{ width: '1250px', height: '550px' }}
                            src={img4}
                            alt="Fourth slide"
                        />
                        <Carousel.Caption>
                            <h3>Taj Palace</h3>
                            <p>Delhi</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </center>
        </div>
    )
}

export default MyCarousel
