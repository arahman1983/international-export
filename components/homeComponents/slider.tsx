import { Carousel } from 'react-bootstrap'
import { useState } from 'react'
import Slide from '../../types/slider'

export default function Slider({ slider }) {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} >
      {
        slider.map((slide: Slide, i: number) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={slide?.h1}
            />
            <Carousel.Caption>
              <h3>{slide?.h1}</h3>
              <p>{slide?.h2}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }

    </Carousel>
  )
}