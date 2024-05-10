import React from "react";
import "./style.css";
import Image from "../../../../components/Image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow } from "swiper/modules";

const ProfilePictures = ({ images }) => {
    return images.length > 0 ? (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
        >
            {images.map((image) => (
                <SwiperSlide key={image}>
                    <Image source={image} size={315} />
                </SwiperSlide>
            ))}
        </Swiper>
    ) : (
        <Image source={'image'} size={315} />
    );
};

export default ProfilePictures;
