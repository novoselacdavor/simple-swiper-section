import 'swiper/swiper-bundle.css';
import './main.scss';

// Import Swiper.js library
import Swiper from 'swiper';
// Get navigation module
import { Navigation } from 'swiper/modules'

class SliderSection extends HTMLElement {
  constructor() {
    super();

    // Define an array of slider images
    const imageUrls = [
      "img/slide1.jpg",
      "img/slide2.jpg",
      "img/slide4.jpg",
      "img/slide5.jpg"
    ];

    // Generate the slider items
    const sliderItems = imageUrls.map((imageUrl) => ({ image: imageUrl }));

    // Generate the HTML using a loop
    const sliderHtml = sliderItems.map((item) => `
      <div class="swiper-slide">
        <img src="${item.image}" alt="Slider image" class="swiper__image">
      </div>
    `).join('');

    // Set the HTML content of the elements
    this.section = document.createElement('section');
    this.section.classList.add('swiper');
    this.section.innerHTML = `
      <div class="swiper-wrapper">
        ${sliderHtml}
      </div>
      <div class="swiper-button-prev">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1476_33)">
            <path d="M13.3334 7.33333H5.22002L8.94669 3.60667L8.00002 2.66667L2.66669 8L8.00002 13.3333L8.94002 12.3933L5.22002 8.66667H13.3334V7.33333Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1476_33">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="swiper-button-next">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1476_37)">
            <path d="M8.00002 2.66667L7.06002 3.60667L10.78 7.33333H2.66669V8.66667H10.78L7.06002 12.3933L8.00002 13.3333L13.3334 8L8.00002 2.66667Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1476_37">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <button class="swiper-toggle">Toggle Swiper</button>
    `;

    // Append the elements
    this.appendChild(this.section);

    // Initialize Swiper instance
    setTimeout(() => {
      // Initialize Swiper instance
      this.initSwiper();
    }, 100);

    // Add event listener to toggle button
    this.section.querySelector('.swiper-toggle').addEventListener('click', () => {
      this.toggleSwiper();
    });
  }

  initSwiper() {
    const nextButton = this.section.querySelector('.swiper-button-next');
    const prevButton = this.section.querySelector('.swiper-button-prev');

    this.swiper = new Swiper(this.section, {
      modules: [Navigation],
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      // Set responsive design options
      breakpoints: {
        320: {
          slidesPerView: 1.05,
          spaceBetween: 8,
        },
        769: {
          slidesPerView: 2.95,
          spaceBetween: 8,
          loop: true
        },
      },
      // Set events
      on: {
        slideChange: () => {
          this.onSlideChange();
        },
      },
    });
  }

  toggleSwiper() {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    } else {
      this.initSwiper();
    }
  }

  onSlideChange() {
    setTimeout(() => {
      console.log("swiper active slide index", this.swiper.activeIndex)
    }, 100)
  }
}

// Register the custom element
customElements.define('simple-swiper-section', SliderSection);
