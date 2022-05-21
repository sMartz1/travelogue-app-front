import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
/* import { useState } from "react"; */
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/grid';
import { Link } from "react-router-dom";

export function Carrousel(props) {
    /* const itineraries = props.itineraries */

    const photoRoutes = 'https://umaipur.uprrp.edu/wp-content/uploads/2019/11/GTD-Hoja-Ruta-Post-Foto-modificada-850x516.jpg'
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
            {objects.map((e, i) => <SwiperSlide className="swiper-slider" key={i}><div className="carrousel--frame-image">
                <img className="carrousel--img-slider" src={props.type === 'itinerary' ? photoRoutes : e.image_path} alt='event' />
                <div className="carrousel--container-text">
                    <Link to={props.type === 'itinerary' ? '/itinerary/' + e.id : '/place/' + e.id} className="carrousel--name-item">{e.name}</Link>
                </div>
            </div>
            </SwiperSlide>)}
        </Swiper></>

}