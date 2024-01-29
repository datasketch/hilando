import Swiper, {Navigation, Pagination, Thumbs, Autoplay, FreeMode, EffectFade} from 'swiper';


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
    slidesPerGroup: 1,

    thumbs: {
      swiper: swiperThumbs,
    },

    autoplay: {
      delay: 3000,
    },
  });
};

export const swiperResilientesHistories = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-histories',
      prevEl: '.swiper-button-prev-histories',
    },

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    // Autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
};

export const swiperResilientesViews = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay, EffectFade],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-views',
      prevEl: '.swiper-button-prev-views',
    },

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    speed: 1000,
    effect: 'fade',

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
};

export const swiperResilientesRead = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Navigation, Autoplay],

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-read',
      prevEl: '.swiper-button-prev-read',
    },

    // Default parameters
    slidesPerView: 1,
    loop: true,
    speed: 1000,

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
};

export const swiperResilientesEntities = (element = '.swiper') => {
  return new Swiper(element, {
    // configure Swiper to use modules
    modules: [Autoplay],

    // Default parameters
    slidesPerView: 2,
    loop: true,
    speed: 1000,

    // Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
};

