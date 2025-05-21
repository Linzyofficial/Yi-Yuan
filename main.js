document.addEventListener('DOMContentLoaded', function() {
    // Variabel untuk elemen yang akan dimanipulasi
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');
    
    // Toggle menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Animasi hamburger menjadi X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Tutup menu saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            
            // Reset hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling untuk link navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset untuk header yang sticky
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fungsi untuk menjalankan slideshow
    function startSlideshow() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        
        // Fungsi untuk mengganti slide
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Set interval untuk mengganti slide setiap 5 detik
        setInterval(nextSlide, 5000);
    }
    
    // Jalankan slideshow ketika halaman sudah dimuat
    startSlideshow();
    
    // Animasi pada scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('fade-in');
                
                // Animasi untuk kartu produk dan berita dengan delay bertahap
                const cards = section.querySelectorAll('.product-card, .news-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 100 * index);
                });
            }
        });
    };
    
    // Jalankan animasi saat halaman dimuat dan saat scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Header sticky dengan shadow saat scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Tambahkan class aktif pada link navigasi berdasarkan posisi scroll
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
    
    // Tambahkan fade-in pada load halaman untuk elemen hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate__animated', 'animate__fadeInUp');
    }
    
    // Lazy loading untuk gambar
    const lazyLoadImages = function() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback untuk browser yang tidak mendukung IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    };
    
    lazyLoadImages();
    
    // Tambahkan CSS untuk fade-in animation jika tidak ada di stylesheet
    if (!document.querySelector('#fade-in-style')) {
        const style = document.createElement('style');
        style.id = 'fade-in-style';
        style.textContent = `
            section, .product-card, .news-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            section.fade-in, .product-card.fade-in, .news-card.fade-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            header.scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .nav-link.active {
                color: var(--primary-color);
            }
            
            .nav-link.active::after {
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Tambahkan tahun saat ini ke copyright
    const copyrightYear = document.querySelector('.copyright p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', currentYear);
    }
});