// ON SCROLL NAVIGATION STYLING SCRIPT STARTS HERE
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
});

// Loading animation for the page
var loaderImg = document.querySelector(".img");
var loader = document.querySelector(".loader");

window.addEventListener('load', hides);
function hides() {
  loader.classList.add("hide");
  loaderImg.classList.add("ImgNone");
}

// NAVIGATION MENU TOGGLE BUTTON SCRIPT STARTS HERE
const Menu = document.querySelector(".nav__navigation");
const menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener('click', () => {
   menuBtn.classList.toggle("menu-active");
   Menu.classList.toggle("active");
});

const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
   const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

   if (currentScrollTop > lastScrollTop) {
      // Scrolling down, hide the navigation
      nav.classList.add('hidden');
      nav.classList.remove('visible');

      // Close the menu if open
      if (Menu.classList.contains("active")) {
         menuBtn.classList.remove("menu-active");
         Menu.classList.remove("active");
      }
   } else {
      // Scrolling up, show the navigation and close the menu
      nav.classList.add('visible');
      nav.classList.remove('hidden');

      if (Menu.classList.contains("active")) {
         menuBtn.classList.remove("menu-active");
         Menu.classList.remove("active");
      }
   }
   lastScrollTop = currentScrollTop;
});

// Close menu when clicking outside of it
document.addEventListener('click', (event) => {
   const isMenuOpen = Menu.classList.contains('active');
   const isClickInsideMenu = Menu.contains(event.target);
   const isClickInsideButton = menuBtn.contains(event.target);

   if (isMenuOpen && !isClickInsideMenu && !isClickInsideButton) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
   }
});

// FAQ SECTION STARTS HERE
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    // Close other open FAQs
    document.querySelectorAll('.faq-item').forEach(faq => {
      if (faq !== item) {
        faq.classList.remove('faq-active');
        faq.querySelector('.faq-answer').style.maxHeight = null;
        faq.querySelector('.faq-answer').style.opacity = 0;
      }
    });

    // Toggle current FAQ
    item.classList.toggle('faq-active');
    let answer = item.querySelector('.faq-answer');
    if (item.classList.contains('faq-active')) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = 1;
    } else {
      answer.style.maxHeight = null;
      answer.style.opacity = 0;
    }
  });
});

// BLOG SECTION CAROUSEL SCRIPT STARTS HERE
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
    
        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
    
        // Check if the new scroll position exceeds 
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= 
            carousel.scrollWidth - carousel.offsetWidth) {
            
            // If so, prevent further dragging
            isDragging = false;
            return;
        }
    
        // Otherwise, update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
    
        // Return if window is smaller than 800
        if (window.innerWidth < 800) return; 
        
        // Calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;
        
        // Calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        
        // If the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;
        
        // Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => 
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? 
                -firstCardWidth : firstCardWidth;
        });
    });
});

// BLOG SECTION BLOG POPUP STARTS HERE
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = "block"; // Ensure it's visible
  setTimeout(() => {
    popup.classList.add("show"); // Trigger animation
  }, 10); // Slight delay to ensure transition works
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.remove("show"); // Remove animation class

  // Use a small timeout to hide the popup after the animation ends
  setTimeout(() => {
    popup.style.display = "none";
  }, 300); // Matches the transition duration
}