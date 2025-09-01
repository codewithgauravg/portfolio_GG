// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Change icon based on menu state
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Add animations to sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            const sectionId = section.getAttribute('id');
            
            // Apply different animations based on section
            if (sectionId === 'hero') {
                section.classList.add('fade-in');
            } else if (sectionId === 'about') {
                section.classList.add('slide-in-left');
            } else if (sectionId === 'skills') {
                section.classList.add('scale-up');
            } else if (sectionId === 'certifications') {
                section.classList.add('slide-in-right');
            } else if (sectionId === 'projects') {
                section.classList.add('fade-in');
            } else if (sectionId === 'research') {
                section.classList.add('slide-in-left');
            } else if (sectionId === 'contact') {
                section.classList.add('scale-up');
            } else {
                section.classList.add('fade-in');
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
});

// Add animation delay to children of sections
document.querySelectorAll('section').forEach((section, index) => {
    const children = section.children;
    Array.from(children).forEach((child, childIndex) => {
        child.classList.add(`delay-${childIndex + 1}`);
    });
});

// Add bounce animation to buttons in hero section
document.querySelectorAll('#hero a').forEach((button, index) => {
    button.classList.add('opacity-0', 'bounce', `delay-${index + 6}`);
});

// Add special animations to skill tags
document.querySelectorAll('#skills span').forEach((span, index) => {
    span.classList.add('opacity-0', 'scale-up', `delay-${index % 8 + 1}`);
    
    // Create observer for skill tags
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0');
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillObserver.observe(span);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if it's just '#'
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add hover-underline-animation class to navigation links
document.querySelectorAll('nav a:not([class*="border"])').forEach(link => {
    link.classList.add('hover-underline-animation');
});

// Add skill-tag class to skill spans
document.querySelectorAll('#skills span').forEach(span => {
    span.classList.add('skill-tag');
});

// Add project-card class to project divs
document.querySelectorAll('#projects > div > div').forEach(div => {
    div.classList.add('project-card');
});

// Create downloadable resume functionality
const resumeLinks = document.querySelectorAll('a[href="#"]');
resumeLinks.forEach(link => {
    if (link.textContent.includes('Resume')) {
        link.href = 'resume.pdf';
        link.setAttribute('target', '_blank');
        link.setAttribute('download', 'Gaurav_Gupta_Resume.pdf');
    }
});