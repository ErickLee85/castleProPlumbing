const serviceBtn = document.getElementById('services-btn');
const serviceLink = document.getElementById('services-link')
const portfolioLink = document.getElementById('portfolio-link')
const faqLink = document.getElementById('faq-link')
const contactLink = document.getElementById('contact-link')
const contactBtn = document.getElementById('contact-us-btn');
const callNowBtn = document.getElementById('call-now-btn')
const heroSection = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const closeBtn = document.querySelector('.close')
const snack = document.querySelector('.snack')

closeBtn.addEventListener('click', () => {
    snack.classList.add('hide')
})

function openSnack() {
    if(snack.classList.contains('hide')) {
        snack.classList.remove('hide')
    }
 snack.classList.add('open')
}

function backToTop() {
    const element = document.querySelector('.hero');
    const yOffset = -160;
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
    });
}

function openFacebookProfile() {
    window.open("https://www.facebook.com/profile.php?id=61565358593625", "_blank");
  }

 function openIG() {
    window.open("https://www.instagram.com/castleproplumbing/?fbclid=IwY2xjawGAX-dleHRuA2FlbQIxMAABHbkt8aM8AiQH--M9-5flwFDL1ya270VsUoAhSYpW4LO8dfJhpb6YwR4RVA_aem_gCJXCYSZjL2MDVy4N6J3ZA", "_blank")
 } 

document.querySelector('.contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    const sendButton = document.getElementById('send-msg-btn');
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...'; 

    try {
        const response = await axios.post('https://nodemailer-gold.vercel.app/emailPlumbers', formData);
        openSnack();
        sendButton.disabled = false;
        sendButton.textContent = 'Send Message'; 
    } catch (error) {
        sendButton.disabled = false;
        sendButton.textContent = 'Send Message'; 
        alert(error.message);
    }
    document.querySelector('.contact-form').reset()
});




// hamburger.addEventListener('click', () => {
//     navMenu.classList.toggle('active');
// });


const images = [
    './images/unplash_img_compressed.webp',
    './images/bathroom-optimized.webp',
    './images/copper_piping-compressed.webp',
    './images/plumber_working-compressed.webp',

];

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    // Check if the clicked item is already active
    if (item.classList.contains('active')) {
      // If active, deactivate it (optional, if you want to allow collapsing)
      item.classList.remove('active');
    } else {
      // Deactivate all other items
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      // Activate the clicked item
      item.classList.add('active');
    }
  });
});

let currentImageIndex = 0;
let preloadedImages = [];

// Preload images function
function preloadImages(callback) {
    let loadedImages = 0;
    
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'white';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.classList.add('.loader')
    document.body.appendChild(loadingOverlay);

    // Preload each image
    images.forEach((src, index) => {
        const img = new Image();
        
        img.onload = () => {
            loadedImages++;
            preloadedImages[index] = img;
            
            if (loadedImages === images.length) {
                document.body.removeChild(loadingOverlay);
                callback();
            }
        };
        
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            loadedImages++;
            
            if (loadedImages === images.length) {
                document.body.removeChild(loadingOverlay);
                callback();
            }
        };
        
        img.src = src;
    });
}

function callUs() {
    window.location.href = 'tel:19018254717'
}

function goToForm() {
    const element = document.getElementById('contact-us-form')
    const yOffset = -50;
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
    });
}

function goToFaq() {
    const element = document.querySelector('.faq-container');
    const yOffset = -160;
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
    });
}

function goToPortfolio() {
    const element = document.querySelector('.portfolio');
    const yOffset = -160;
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
    });
}


function goToServices() {
    const element = document.querySelector('.services');
    const yOffset = -160;
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
    });
}

function createBackgroundContainer() {
    // Create a container for all background images
    const bgContainer = document.createElement('div');
    bgContainer.className = 'hero-backgrounds';
    bgContainer.style.position = 'absolute';
    bgContainer.style.top = '0';
    bgContainer.style.left = '0';
    bgContainer.style.width = '100%';
    bgContainer.style.height = '100%';
    bgContainer.style.zIndex = '1'; // Place behind content
    return bgContainer;
}

function changeBackgroundImage() {
    let bgContainer = heroSection.querySelector('.hero-backgrounds');
    if (!bgContainer) {
        bgContainer = createBackgroundContainer();
        heroSection.insertBefore(bgContainer, heroSection.firstChild); // Insert at the beginning
    }

    const nextImageIndex = (currentImageIndex + 1) % images.length;
    
    // Create a new div for the next image
    const nextImageDiv = document.createElement('div');
    nextImageDiv.style.position = 'absolute';
    nextImageDiv.style.top = '0';
    nextImageDiv.style.left = '0';
    nextImageDiv.style.width = '100%';
    nextImageDiv.style.height = '100%';
    nextImageDiv.style.opacity = '0';
    nextImageDiv.style.transition = 'opacity 1s ease-in-out';
    nextImageDiv.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url('${images[nextImageIndex]}')`;
    nextImageDiv.style.backgroundPosition = 'center';
    nextImageDiv.style.backgroundRepeat = 'no-repeat';
    nextImageDiv.style.backgroundSize = 'cover';
    
    bgContainer.appendChild(nextImageDiv);
    
    // Force a reflow
    nextImageDiv.offsetHeight;
    
    // Fade in the new image
    nextImageDiv.style.opacity = '1';
    
    // Remove old background images after transition
    setTimeout(() => {
        const oldImages = bgContainer.getElementsByTagName('div');
        while (oldImages.length > 1) {
            bgContainer.removeChild(oldImages[0]);
        }
    }, 1000);
    
    currentImageIndex = nextImageIndex;
}

// Start everything after images are preloaded
preloadImages(() => {
    // Make sure hero section is properly positioned for absolute children
    heroSection.style.position = 'relative';
    heroSection.style.overflow = 'hidden';
    
    // Initial image setup
    changeBackgroundImage();
    
    // Start the interval
    setInterval(changeBackgroundImage, 6000);
});

serviceBtn.addEventListener('click', goToServices);
serviceLink.addEventListener('click', goToServices)
portfolioLink.addEventListener('click', goToPortfolio)
faqLink.addEventListener('click', goToFaq)
contactLink.addEventListener('click', goToForm)
contactBtn.addEventListener('click', goToForm)
callNowBtn.addEventListener('click', callUs)


gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
const heroAnimation = () => {
  const tl = gsap.timeline();
  
  tl.from('.hero-titles h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.hero-titles p', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  })
  .from('.hero-titles button', {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  });
};

// Navigation Animations
const navAnimation = () => {
  gsap.from('nav', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.nav-links li', {
    opacity: 0,
    y: -20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.5
  });
};

// Security Section Animation
const securityAnimation = () => {
  gsap.from('.security-details', {
    scrollTrigger: {
      trigger: '.security-details',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.security-image img', {
    scrollTrigger: {
      trigger: '.security-image',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
};

// Services Cards Animation
const servicesAnimation = () => {
  gsap.from('.service-text', {
    scrollTrigger: {
      trigger: '.service-text',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1
  });

  gsap.from('.card', {
    scrollTrigger: {
      trigger: '.service-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });
};

// Portfolio Images Animation
const portfolioAnimation = () => {
  // Set initial state for all portfolio images
  gsap.set('.image-container div', {
    autoAlpha: 0,
    scale: 0.8
  });

  // Create the animation
  gsap.to('.image-container div', {
    scrollTrigger: {
      trigger: '.image-container',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    autoAlpha: 1,
    scale: 1,
    duration: 0.5,
    stagger: {
      amount: 0.8,
      grid: 'auto',
      from: 'start'
    },
    ease: 'back.out(1.2)'
  });
};

// FAQ Section Animation
const faqAnimation = () => {
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '.faq-container',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  });
};

// Contact Form Animation
const contactAnimation = () => {
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  navAnimation();
  heroAnimation();
  securityAnimation();
  servicesAnimation();
  portfolioAnimation();
  faqAnimation();
  contactAnimation();
});
