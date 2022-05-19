import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
/* import { useState } from "react"; */
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/grid';
import "./index.scss";

const itineraries = [
    { urlImage: 'https://img1.10bestmedia.com/Images/Photos/378847/GettyImages-1085317916_54_990x660.jpg', title: 'Barcelona' }, { urlImage: 'https://a.cdn-hotels.com/gdcs/production133/d1207/7ad2d7f0-68ce-11e8-8a0f-0242ac11000c.jpg', title: 'Madrid' },
    { urlImage: 'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900', title: 'Paris' }, { urlImage: 'https://www.cadizturismo.com/storage/app/media/uploaded-files/p-cadiz_turismo.jpg', title: 'Cadiz' }
]

export function Carrousel(props) {
    /* const itineraries = props.itineraries */

    const objects = props.objects


    return <>
        <Swiper
            slidesPerView={5}
            spaceBetween={10}
            slidesPerGroup={5}
            breakpoints={{
                250: {
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
            {objects.map((e, i) => <SwiperSlide className="swiper-slider" key={i}><img className="carrousel--img-slider" src={e.image_path} alt='event' /><h3>{e.name}</h3></SwiperSlide>)}
        </Swiper></>

}