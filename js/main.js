// Main JavaScript file for Mr. Indoram Portfolio

$(document).ready(function() {
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Skill cards animation on scroll
    function animateSkills() {
        $('.skill-card').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fade-in');
            }
        });
    }

    $(window).on('scroll', animateSkills);
    animateSkills(); // Initial check

    // Progress bars animation
    function animateProgressBars() {
        $('.progress-bar').each(function() {
            var progressBar = $(this);
            var elementTop = progressBar.offset().top;
            var elementBottom = elementTop + progressBar.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                var width = progressBar.data('width');
                progressBar.css('width', width + '%');
            }
        });
    }

    $(window).on('scroll', animateProgressBars);

    // Form validation and submission
    function setupFormValidation() {
        // Contact form validation
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            var name = $('#name').val().trim();
            var email = $('#email').val().trim();
            var message = $('#message').val().trim();
            var isValid = true;

            // Reset previous error states
            $('.form-control').removeClass('is-invalid');
            $('.invalid-feedback').hide();

            // Validate name
            if (name === '') {
                $('#name').addClass('is-invalid');
                $('#name').siblings('.invalid-feedback').show();
                isValid = false;
            }

            // Validate email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                $('#email').addClass('is-invalid');
                $('#email').siblings('.invalid-feedback').show();
                isValid = false;
            }

            // Validate message
            if (message === '') {
                $('#message').addClass('is-invalid');
                $('#message').siblings('.invalid-feedback').show();
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                var submitBtn = $(this).find('button[type="submit"]');
                var originalText = submitBtn.html();
                submitBtn.html('<span class="loading me-2"></span>Sending...').prop('disabled', true);

                // Simulate form submission (replace with actual backend call)
                setTimeout(function() {
                    submitBtn.html(originalText).prop('disabled', false);
                    showNotification('Message sent successfully!', 'success');
                    $('#contactForm')[0].reset();
                }, 2000);
            }
        });

        // Hiring form validation
        $('#hiringForm').on('submit', function(e) {
            e.preventDefault();
            
            var name = $('#applicantName').val().trim();
            var email = $('#applicantEmail').val().trim();
            var linkedin = $('#linkedin').val().trim();
            var github = $('#github').val().trim();
            var skills = [];
            var message = $('#applicantMessage').val().trim();
            var isValid = true;

            // Get selected skills
            $('input[name="skills"]:checked').each(function() {
                skills.push($(this).val());
            });

            // Reset previous error states
            $('.form-control').removeClass('is-invalid');
            $('.invalid-feedback').hide();

            // Validate required fields
            if (name === '') {
                $('#applicantName').addClass('is-invalid');
                isValid = false;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                $('#applicantEmail').addClass('is-invalid');
                isValid = false;
            }

            if (skills.length === 0) {
                $('.skills-group').addClass('is-invalid');
                $('.skills-error').show();
                isValid = false;
            }

            if (message === '') {
                $('#applicantMessage').addClass('is-invalid');
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                var submitBtn = $(this).find('button[type="submit"]');
                var originalText = submitBtn.html();
                submitBtn.html('<span class="loading me-2"></span>Submitting...').prop('disabled', true);

                // Simulate form submission
                setTimeout(function() {
                    submitBtn.html(originalText).prop('disabled', false);
                    showNotification('Application submitted successfully! We will review your submission.', 'success');
                    $('#hiringForm')[0].reset();
                }, 2000);
            }
        });

        // Login form validation
        $('#loginForm').on('submit', function(e) {
            e.preventDefault();
            
            var email = $('#loginEmail').val().trim();
            var password = $('#loginPassword').val().trim();
            var isValid = true;

            // Reset previous error states
            $('.form-control').removeClass('is-invalid');
            $('.invalid-feedback').hide();

            // Validate email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                $('#loginEmail').addClass('is-invalid');
                isValid = false;
            }

            // Validate password
            if (password === '') {
                $('#loginPassword').addClass('is-invalid');
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                var submitBtn = $(this).find('button[type="submit"]');
                var originalText = submitBtn.html();
                submitBtn.html('<span class="loading me-2"></span>Logging in...').prop('disabled', true);

                // Simulate login (replace with actual authentication)
                setTimeout(function() {
                    submitBtn.html(originalText).prop('disabled', false);
                    
                    // Simulate successful login
                    if (email === 'admin@example.com' && password === 'password') {
                        showNotification('Login successful! Welcome back.', 'success');
                        // Redirect to dashboard or admin area
                        setTimeout(function() {
                            window.location.href = 'index.html';
                        }, 1500);
                    } else {
                        showNotification('Invalid email or password. Please try again.', 'error');
                    }
                }, 1500);
            }
        });
    }

    // Notification system
    function showNotification(message, type) {
        var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        var notification = $(`
            <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

        $('body').append(notification);

        // Auto dismiss after 5 seconds
        setTimeout(function() {
            notification.alert('close');
        }, 5000);
    }

    // Initialize form validation
    setupFormValidation();

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation if on home page
    if ($('.hero-section').length) {
        setTimeout(function() {
            const subtitle = document.querySelector('.hero-section .lead');
            if (subtitle) {
                typeWriter(subtitle, "Building the Future of Web — and Building the Team to Power It", 50);
            }
        }, 2000);
    }

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Add back to top button to body
    $('body').append(`
        <button id="backToTop" class="btn btn-primary position-fixed" 
                style="bottom: 30px; right: 30px; z-index: 1000; display: none; border-radius: 50%; width: 50px; height: 50px;">
            <i class="fas fa-arrow-up"></i>
        </button>
    `);

    // Mobile menu improvements
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on nav links
    $('.navbar-nav .nav-link').click(function() {
        if ($('.navbar-toggler').is(':visible')) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // Initialize tooltips if Bootstrap 5 is loaded
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add loading animation to external links
    $('a[href^="http"]').not('[href*="' + location.hostname + '"]').addClass('external-link');
    
    $('.external-link').click(function() {
        var link = $(this);
        if (!link.hasClass('loading')) {
            link.addClass('loading');
            var originalText = link.html();
            link.html('<span class="loading me-2"></span>' + originalText);
            
            setTimeout(function() {
                link.removeClass('loading').html(originalText);
            }, 1000);
        }
    });

    console.log('Mr. Indoram Portfolio - JavaScript loaded successfully!');
});

// Portfolio filter functionality (for portfolio page)
function filterProjects(category) {
    $('.project-card').hide();
    
    if (category === 'all') {
        $('.project-card').fadeIn();
    } else {
        $('.project-card[data-category="' + category + '"]').fadeIn();
    }
    
    // Update active filter button
    $('.filter-btn').removeClass('active');
    $('.filter-btn[data-filter="' + category + '"]').addClass('active');
}

// Initialize project filtering
$(document).ready(function() {
    $('.filter-btn').click(function() {
        var filter = $(this).data('filter');
        filterProjects(filter);
    });
});

// Skills animation counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Form data handler (to be replaced with actual backend)
function handleFormSubmission(formData, formType) {
    // This would typically send data to your Python backend
    console.log(`${formType} form submitted:`, formData);
    
    // Simulate sending email notification
    const emailData = {
        to: 'arjunkumar73384@gmail.com',
        subject: `New ${formType} submission from ${formData.name}`,
        body: JSON.stringify(formData, null, 2)
    };
    
    console.log('Email would be sent:', emailData);
    return true;
}