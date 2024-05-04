import React, { useContext } from "react";
import { AccountContext } from "../../Context/AccountContext";
import withAuth from "../../components/PrivateRoutes";
import Image from "../../components/Image";
import "./style.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const Profile = () => {
    const { user } = useContext(AccountContext);
    console.log(user);
    const images = [
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-3.jpg",
    ];
    return (
        <div className="profile-images">
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {images.map((image) => (
                    <SwiperSlide>
                        <Image source={image} size={150} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}; 

export default withAuth(Profile);
