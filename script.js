// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const prevQuoteBtn = document.getElementById('prev-quote');
const nextQuoteBtn = document.getElementById('next-quote');
const quoteText = document.querySelector('.quote-text');
const quoteSource = document.querySelector('.quote-source');
const quoteCounter = document.getElementById('quote-counter');
const generatePasswordBtn = document.getElementById('generate-password');
const copyPasswordBtn = document.getElementById('copy-password');
const passwordDisplay = document.getElementById('password-display');
const shortenBtn = document.getElementById('shorten-btn');
const urlInput = document.getElementById('url-input');
const shortUrlResult = document.getElementById('short-url-result');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('quality-value');
const compressBtn = document.getElementById('compress-btn');
const uploadArea = document.getElementById('upload-area');
const imageUpload = document.getElementById('image-upload');
const compressionResult = document.getElementById('compression-result');
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');

// Islamic Quotes Data
const quotes = [
    {
        text: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
        source: "Quran 65:2-3"
    },
    {
        text: "Allah does not burden a soul beyond that it can bear.",
        source: "Quran 2:286"
    },
    {
        text: "Verily, with hardship comes ease.",
        source: "Quran 94:5"
    },
    {
        text: "The best among you are those who have the best manners and character.",
        source: "Sahih al-Bukhari"
    },
    {
        text: "Do not lose hope, nor be sad.",
        source: "Quran 3:139"
    }
];

// Current quote index
let currentQuoteIndex = 0;

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Update quote display
function updateQuote() {
    quoteText.textContent = quotes[currentQuoteIndex].text;
    quoteSource.textContent = quotes[currentQuoteIndex].source;
    quoteCounter.textContent = `${currentQuoteIndex + 1}/${quotes.length}`;
}

// Previous quote
prevQuoteBtn.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    updateQuote();
});

// Next quote
nextQuoteBtn.addEventListener('click', () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    updateQuote();
});

// Initialize first quote
updateQuote();

// Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const uppercase = document.getElementById('uppercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;
    
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    passwordDisplay.textContent = password;
}

// Copy Password
copyPasswordBtn.addEventListener('click', () => {
    if (passwordDisplay.textContent === 'Click Generate') return;
    
    navigator.clipboard.writeText(passwordDisplay.textContent)
        .then(() => {
            const originalText = copyPasswordBtn.innerHTML;
            copyPasswordBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyPasswordBtn.innerHTML = originalText;
            }, 2000);
        });
});

// URL Shortener (mock functionality)
shortenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    
    if (!url) {
        shortUrlResult.innerHTML = '<span class="error">Please enter a URL</span>';
        return;
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        shortUrlResult.innerHTML = '<span class="error">Please enter a valid URL</span>';
        return;
    }
    
    // Mock shortening - in a real app, this would call an API
    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortUrl = `https://asadwrites.com/${shortCode}`;
    
    shortUrlResult.innerHTML = `
        <p>Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
        <button class="btn small copy-btn">Copy</button>
    `;
    
    // Add event listener to the new copy button
    document.querySelector('.copy-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                const copyBtn = document.querySelector('.copy-btn');
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
    });
});

// Image Compressor (mock functionality)
qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = `${qualitySlider.value}%`;
});

uploadArea.addEventListener('click', () => {
    imageUpload.click();
});

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        compressionResult.innerHTML = '<span class="error">Please select an image file</span>';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        uploadArea.innerHTML = `
            <img src="${event.target.result}" alt="Preview" class="upload-preview">
            <p>${file.name}</p>
            <p>${(file.size / 1024).toFixed(2)} KB</p>
        `;
    };
    reader.readAsDataURL(file);
});

compressBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!imageUpload.files[0]) {
        compressionResult.innerHTML = '<span class="error">Please upload an image first</span>';
        return;
    }
    
    // Mock compression - in a real app, this would use a compression library
    const file = imageUpload.files[0];
    const originalSize = (file.size / 1024).toFixed(2);
    const quality = parseInt(qualitySlider.value);
    const compressedSize = (file.size * (quality / 100) / 1024).toFixed(2);
    
    compressionResult.innerHTML = `
        <div class="compression-stats">
            <div>
                <span>Original:</span>
                <span>${originalSize} KB</span>
            </div>
            <div>
                <span>Compressed:</span>
                <span>${compressedSize} KB</span>
            </div>
            <div>
                <span>Reduction:</span>
                <span>${(100 - quality)}%</span>
            </div>
        </div>
        <a href="#" class="btn primary download-btn">Download Compressed Image</a>
    `;
    
    // In a real implementation, the download button would provide the actual compressed image
    document.querySelector('.download-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert('In a real implementation, this would download the compressed image. This is a demo.');
    });
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // In a real app, this would send the data to your server
    alert(`Thank you for subscribing with ${email}! You'll hear from us soon.`);
    newsletterForm.reset();
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real app, this would send the data to your server
    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    contactForm.reset();
});

// Animate stats counter
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(increment);
            } else {
                stat.textContent = target;
            }
        };
        
        increment();
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateStats();
            }
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements that should animate
document.querySelectorAll('.stats, .tool-card, .blog-card, .resource-card').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});
