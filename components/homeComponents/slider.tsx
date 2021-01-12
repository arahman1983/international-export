import { Carousel } from 'react-bootstrap'
import { useState } from 'react'
import {AdminSlide} from '../../types/slider'

export default function Slider({ slider }) {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} >
      {
        slider.map((slide: AdminSlide, i: number) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={slide?.title}
            />
            <Carousel.Caption>
              <h3>{slide?.title}</h3>
              <p>{slide?.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }

    </Carousel>
  )
}