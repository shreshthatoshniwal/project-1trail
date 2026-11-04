// InkSight Publication - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements for Login / Sign Up
    const authModal = document.getElementById('authModal');
    const modalClose = document.getElementById('modalClose');
    const loginBtn = document.getElementById('loginBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const nameField = document.getElementById('nameField');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');
    const modalToggleText = document.getElementById('modalToggleText');
    const modalToggleLink = document.getElementById('modalToggleLink');

    let isSignUp = false;

    function openModal(signupMode = false) {
        isSignUp = signupMode;
        if (isSignUp) {
            modalTitle.textContent = 'Create an Account';
            modalSubtitle.textContent = 'Join the InkSight academic & literary community';
            nameField.style.display = 'flex';
            modalSubmitBtn.textContent = 'Create Account';
            modalToggleText.textContent = 'Already have an account?';
            modalToggleLink.textContent = 'Sign In';
        } else {
            modalTitle.textContent = 'Welcome Back';
            modalSubtitle.textContent = 'Access the InkSight repository and subscription library';
            nameField.style.display = 'none';
            modalSubmitBtn.textContent = 'Sign In';
            modalToggleText.textContent = "Don't have an account?";
            modalToggleLink.textContent = 'Create one';
        }
        authModal.classList.add('active');
    }

    function closeModal() {
        authModal.classList.remove('active');
    }

    if (loginBtn) loginBtn.addEventListener('click', () => openModal(false));
    if (signUpBtn) signUpBtn.addEventListener('click', () => openModal(true));
    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modalToggleLink) {
        modalToggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(!isSignUp);
        });
    }

    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeModal();
        });
    }

    // =========================================================
    // Fresh Off Press Releases - 3 Books Slider with Arrow Controls
    // =========================================================
    const pressViewport = document.getElementById('pressCarouselViewport');
    const pressTrack = document.getElementById('pressTrack');
    const pressPrevBtn = document.getElementById('pressPrevBtn');
    const pressNextBtn = document.getElementById('pressNextBtn');

    if (pressTrack && pressPrevBtn && pressNextBtn) {
        const bookCards = pressTrack.querySelectorAll('.book-card-horizontal, .press-book-card');
        const totalBooks = bookCards.length;
        let currentIndex = 0;

        function getVisibleCount() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 860) return 2;
            return 3; // Exactly 3 books visible on desktop
        }

        function updateSlider() {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, totalBooks - visibleCount);

            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            if (window.innerWidth > 768) {
                // Desktop: Translate using flex card percentage
                const cardWidth = bookCards[0] ? bookCards[0].offsetWidth : 0;
                const gap = 20;
                const shift = currentIndex * (cardWidth + gap);
                pressTrack.style.transform = `translateX(-${shift}px)`;
            } else if (pressViewport) {
                // Mobile: Smooth native scroll
                const cardWidth = bookCards[0] ? bookCards[0].offsetWidth : 290;
                const gap = 12;
                pressViewport.scrollTo({
                    left: currentIndex * (cardWidth + gap),
                    behavior: 'smooth'
                });
            }

            // Update arrow button states
            pressPrevBtn.disabled = currentIndex === 0;
            pressNextBtn.disabled = currentIndex >= maxIndex;
        }

        pressPrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        pressNextBtn.addEventListener('click', () => {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, totalBooks - visibleCount);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        // Update on resize
        window.addEventListener('resize', () => {
            updateSlider();
        });

        // Initialize state
        updateSlider();
    }
});
