import Carousel from 'react-multi-carousel';
import Link from 'next/link'
import 'react-multi-carousel/lib/styles.css';

export default function BrandSlider(props: any) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container text-center"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={props.deviceType}
      itemClass="carousel-item-padding-40-px mx-0"
    >
      {
        props.sliderItems.map((item, i) => (
          <Link href={`/products/${item.id}`} key={i}>
            <a>
              <img src={item.image} alt={item.name} width={100} />
            </a>
          </Link>
        ))
      }
    </Carousel>
  )
}