// DOM Elements
const loginCard = document.getElementById('loginCard');
const otpCard = document.getElementById('otpCard');
const loginForm = document.getElementById('loginForm');
const otpForm = document.getElementById('otpForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backButton = document.getElementById('backButton');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const otpInputs = document.querySelectorAll('.otp-input');
const resendLink = document.getElementById('resendLink');

// Password Toggle
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isPassword = passwordInput.getAttribute('type') === 'password';
        const type = isPassword ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icons
        const eyeOpen = togglePassword.querySelector('.eye-open');
        const eyeClosed = togglePassword.querySelector('.eye-closed');
        
        if (eyeOpen && eyeClosed) {
            if (isPassword) {
                // Show password - show closed eye
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                // Hide password - show open eye
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        }
        
        // Animate the icon
        togglePassword.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            togglePassword.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
}

// Forgot Password - Show OTP Screen
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOTPScreen();
});

// Back Button - Show Login Screen
backButton.addEventListener('click', () => {
    showLoginScreen();
});

// Show OTP Screen with Animation
function showOTPScreen() {
    loginCard.classList.add('hidden');
    setTimeout(() => {
        otpCard.classList.add('active');
        // Focus first OTP input
        setTimeout(() => {
            otpInputs[0].focus();
        }, 300);
    }, 200);
}

// Show Login Screen with Animation
function showLoginScreen() {
    otpCard.classList.remove('active');
    setTimeout(() => {
        loginCard.classList.remove('hidden');
        // Clear OTP inputs
        otpInputs.forEach(input => {
            input.value = '';
        });
    }, 200);
}

// OTP Input Handling
otpInputs.forEach((input, index) => {
    // Handle input
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        // Auto-focus next input
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
        
        // Add success animation
        input.style.transform = 'scale(1.1)';
        setTimeout(() => {
            input.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Handle backspace
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus();
            otpInputs[index - 1].value = '';
        }
    });
    
    // Handle paste
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        
        if (/^\d{6}$/.test(pastedData)) {
            pastedData.split('').forEach((digit, i) => {
                if (otpInputs[i]) {
                    otpInputs[i].value = digit;
                    otpInputs[i].style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        otpInputs[i].style.transform = 'scale(1)';
                    }, 200);
                }
            });
            
            // Focus last input
            if (otpInputs[5]) {
                otpInputs[5].focus();
            }
        }
    });
    
    // Prevent non-numeric input
    input.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Add loading state
    const submitButton = loginForm.querySelector('.login-button');
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Add success animation
        submitButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitButton.style.transform = 'scale(1)';
        }, 200);
        
        // In a real application, you would handle the response here
        // For demo purposes, we'll just show an alert
        // alert('Login successful! (This is a demo)');
    }, 1500);
});

// OTP Form Submission
otpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get OTP value
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        // Shake animation for invalid OTP
        otpInputs.forEach(input => {
            input.style.animation = 'shake 0.5s ease';
        });
        
        setTimeout(() => {
            otpInputs.forEach(input => {
                input.style.animation = '';
            });
        }, 500);
        
        return;
    }
    
    // Add loading state
    const verifyButton = otpForm.querySelector('.verify-button');
    verifyButton.classList.add('loading');
    verifyButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('OTP verification:', otp);
        
        // Remove loading state
        verifyButton.classList.remove('loading');
        verifyButton.disabled = false;
        
        // Add success animation
        verifyButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            verifyButton.style.transform = 'scale(1)';
        }, 200);
        
        // In a real application, you would handle the response here
        // For demo purposes, we'll just show an alert
        // alert('OTP verified successfully! (This is a demo)');
    }, 1500);
});

// Resend OTP
resendLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Add loading state
    resendLink.style.opacity = '0.5';
    resendLink.style.pointerEvents = 'none';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Resending OTP...');
        
        // Remove loading state
        resendLink.style.opacity = '1';
        resendLink.style.pointerEvents = 'auto';
        
        // Show feedback
        const originalText = resendLink.textContent;
        resendLink.textContent = 'Sent!';
        resendLink.style.color = '#14b8a6';
        
        setTimeout(() => {
            resendLink.textContent = originalText;
            resendLink.style.color = '';
        }, 2000);
    }, 1000);
});

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Add smooth focus transitions
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement?.classList.remove('focused');
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button, .forgot-password, .card-footer a').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button, .forgot-password, .card-footer a {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Prevent form submission on Enter in OTP inputs (except last one)
otpInputs.forEach((input, index) => {
    if (index < otpInputs.length - 1) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (input.value && otpInputs[index + 1]) {
                    otpInputs[index + 1].focus();
                }
            }
        });
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Initialize - Add entrance animation
window.addEventListener('load', () => {
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        loginCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        loginCard.style.opacity = '1';
        loginCard.style.transform = 'translateY(0)';
    }, 100);
});

