/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide, Navigation, Thumbs, FreeMode } from "./slider";
import { ChevronLeft, ChevronRight, PlayIcon } from "../../assets/SvgIcons";
// import { Image } from "@/components/ui/image";
import classNames from "classnames";

import { productPlaceholder } from "../../utils/placeholders";

// Property gallery breakpoints
const galleryCarouselBreakpoints = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 3,
  },
  800: {
    slidesPerView: 4,
  },
};

const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 0,
};

export const ThumbsCarousel = ({
  gallery,
  video,
  hideThumbs = false,
  // aspectRatio = "square",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className=" grid grid-cols-6 gap-2">
      <div className="relative col-span-5">
        <Swiper
          id="productGallery"
          modules={[Navigation, Thumbs, FreeMode]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          // navigation={{
          //   prevEl: prevRef.current,
          //   nextEl: nextRef.current,
          // }}
          {...swiperParams}
        >
          {gallery?.map((item, imageIndex) => (
            <SwiperSlide
              key={`product-gallery-${item?.id || imageIndex}`}
              className="!flex items-center justify-center selection:bg-transparent"
            >
              <img
                src={item?.image ?? productPlaceholder}
                alt={`Property gallery ${item?.id || imageIndex}`}
                // width={aspectRatio === "square" ? 450 : 420}
                // height={aspectRatio === "square" ? 450 : 560}
                className=" object-cover w-[100%]  lg:min-h-[450px] max-h-[450px] rounded-t-lg"
              />
              {/* <Image
                src={item?.original ?? productPlaceholder}
                alt={`Property gallery ${item.id || imageIndex}`}
                width={aspectRatio === "square" ? 450 : 420}
                height={aspectRatio === "square" ? 450 : 560}
              /> */}
            </SwiperSlide>
          ))}
          {video?.length
            ? video.map((item, index) => (
                <SwiperSlide key={`product-video-${index}`}>
                  {item.url.includes("iframe") ? (
                    <div
                      className="product-video-iframe"
                      dangerouslySetInnerHTML={{ __html: item.url }}
                    />
                  ) : (
                    <div className="product-video-iframe">
                      <video controls src={item.url} />
                    </div>
                  )}
                </SwiperSlide>
              ))
            : null}
        </Swiper>
        {/* <div
          ref={prevRef}
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer product-gallery-prev top-2/4 -left-2 border-border-200 border-opacity-70 bg-light text-heading hover:bg-gray-100 md:-mt-5 md:h-9 md:w-9 "
        >
          <ChevronLeft className="w-4 h-4" />
        </div>
        <div
          ref={nextRef}
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer product-gallery-next top-2/4 -right-2 border-border-200 border-opacity-70 bg-light text-heading hover:bg-gray-100  md:-mt-5 md:h-9 md:w-9 "
        >
          <ChevronRight className="w-4 h-4" />
        </div> */}
      </div>
      {/* End of product main slider */}
      <div
        className={classNames(
          "relative my-auto mt-5 max-h-[448px] overflow-y-scroll lg:mt-0 lg:pb-2 hide-scrollbar",
          { hidden: hideThumbs }
        )}
      >
        <div className=" hidden lg:block">
          <Swiper
            id="productGalleryThumbs"
            onSwiper={setThumbsSwiper}
            spaceBetween={16}
            watchSlidesProgress={true}
            freeMode={true}
            modules={[Navigation, Thumbs, FreeMode]}
            observer={true}
            observeParents={true}
            breakpoints={galleryCarouselBreakpoints}
            direction={"vertical"}
          >
            {gallery?.map((item, index) => (
              <SwiperSlide
                key={`product-thumb-gallery-${item?.id || index}`}
                className=" min-h-[100px] max-h-[100px] max-w-[100px] cursor-pointer  overflow-hidden rounded-md border border-border-200 border-opacity-75 hover:opacity-75"
              >
                <div className="relative w-[100px] h-[100px] ">
                  <img
                    src={item?.image ?? productPlaceholder}
                    alt={`Property Image ${item?.id || index}`}
                    className="object-cover object-center h-[100px] min-w-[100px] min-h-[100px] "
                  />
                  {/* <Image
                  src={item?.thumbnail ?? productPlaceholder}
                  alt={`Property Image ${item.id}`}
                  fill
                  className="object-contain"
                /> */}
                </div>
              </SwiperSlide>
            ))}
            {video?.length
              ? video.map((item, index) => (
                  <SwiperSlide
                    key={`product-video-${index}`}
                    className="relative flex items-center justify-center overflow-hidden border border-opacity-75 rounded cursor-pointer border-border-200 hover:opacity-75"
                  >
                    <div className="w-20 h-20" />
                    <div className="absolute flex items-center justify-center w-12 h-12 text-white -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-accent-400">
                      <PlayIcon className="w-4 h-4" />
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

ThumbsCarousel.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      original: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ).isRequired,
  video: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ),
  hideThumbs: PropTypes.bool,
  aspectRatio: PropTypes.oneOf(["auto", "square"]),
};
