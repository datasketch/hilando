import Swiper, {Navigation, Pagination, Thumbs, Autoplay, FreeMode} from 'swiper';


// swiper banner
export const swiperBanner = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Pagination, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'opacity-40',
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Autoplay
    autoplay: {
      delay: 5000,
    },
  });
};

// swiper news feature
export const swiperNews = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-news',
      prevEl: '.swiper-button-prev-news',
      disabledClass: 'opacity-40',
    },

    // Autoplay
    autoplay: {
      delay: 5000,
    },

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,

    // Responsive breakpoints
    breakpoints: {
      1366: {
        slidesPerView: 2,
        spaceBetween: 57.5,
      },
    },
  });
};

export const swiperEvents = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'opacity-40',
    },

    // Autoplay
    autoplay: {
      delay: 5000,
    },

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,

    // Responsive breakpoints
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 54.18,
      },
    },
  });
};


export const swiperGalleryThumbs = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay, FreeMode],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'opacity-40',
    },

    // Autoplay
    autoplay: {
      delay: 5000,
    },

    // Default parameters
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',

    // Responsive breakpoints
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 12,
      },
    },
  });
};

export const swiperGalleryMain = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Thumbs, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'opacity-40',
    },

    // Default parameters
    spaceBetween: 10,

    thumbs: {
      swiper: swiperThumbs,
    },

    autoplay: {
      delay: 3000,
    },
  });
};

