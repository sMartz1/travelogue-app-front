import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
/* import { useState } from "react"; */
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/grid';

export function Carrousel(props) {
    /* const itineraries = props.itineraries */

    const objects = props.objects


    return <>
        <Swiper
            slidesPerView={5}
            spaceBetween={10}
            slidesPerGroup={5}
            breakpoints={{
                150: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                420: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                580: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                740: {
                    slidesPerView: 4,
                    spaceBetween: 40
                }
            }}
            loop={true}
            loopFillGroupWithBlank={false}
            pagination={{
                clickable: true
            }}
            modules={[Pagination]}
        >
            {objects.map((e, i) => <SwiperSlide className="swiper-slider" key={i}><div className="carrousel--frame-image"><img className="carrousel--img-slider" src={e.image_path} alt='event' /><div className="carrousel--container-text"><h3 className="carrousel--name-item">{e.name}</h3></div></div></SwiperSlide>)}
        </Swiper></>

}