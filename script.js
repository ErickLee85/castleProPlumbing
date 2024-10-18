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
 snack.classList.add('open')
}


document.getElementById('send-msg-btn').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Gather form inputs
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
        openSnack()
        sendButton.disabled = false;
        sendButton.textContent = 'Send Message'; 
      } catch (error) {
        sendButton.disabled = false;
        sendButton.textContent = 'Send Message'; 
        alert(error.message)
      }
      document.querySelector('.contact-form').reset();

});




// hamburger.addEventListener('click', () => {
//     navMenu.classList.toggle('active');
// });
const images = [
    './images/unplash_img.jpg',
    './images/bathroom.jpg',
    './images/copper_piping.jpeg',
    './images/plumber_working.jpeg',

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
    loadingOverlay.innerHTML = 'Loading...';
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

