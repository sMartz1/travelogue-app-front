import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
/* import { useState } from "react"; */
import "swiper/css";
import "swiper/css/pagination";
import "./index.scss";

const itineraries = [
    {urlImage:'https://img1.10bestmedia.com/Images/Photos/378847/GettyImages-1085317916_54_990x660.jpg',title:'Barcelona'},{urlImage:'https://a.cdn-hotels.com/gdcs/production133/d1207/7ad2d7f0-68ce-11e8-8a0f-0242ac11000c.jpg',title:'Madrid'},
    {urlImage:'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900',title:'Paris'},{urlImage:'https://www.cadizturismo.com/storage/app/media/uploaded-files/p-cadiz_turismo.jpg',title:'Cadiz'}
]
const imageSize = '100px'
export function Carrousel (props){
    /* const itineraries = props.itineraries */


    return <>
    <Swiper
    slidesPerView={3}
    spaceBetween={10}
    slidesPerGroup={3}
    loop={true}
    loopFillGroupWithBlank={false}
    pagination={{
      clickable: true
    }}
    modules={[Pagination]}
    className="mySwiper"
    >
        {itineraries.map((e,i)=> <SwiperSlide key={i}><img width={imageSize} height={imageSize} src={e.urlImage} alt=''/><h3>{e.title}</h3></SwiperSlide>)}
    </Swiper></>

}