// DOM Elements
const signupForm = document.getElementById('signupForm');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const passwordLengthError = document.getElementById('passwordLengthError');
const passwordStrength = document.getElementById('passwordStrength');
const strengthText = document.getElementById('strengthText');
const strengthFill = document.getElementById('strengthFill');

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
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
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

// Password Validation and Strength Indicator
let passwordTimeout;

// Function to show popup with animation
function showPopup(popup) {
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
}

// Function to hide popup with animation
function hidePopup(popup) {
    popup.classList.add('hidden');
    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.remove('hidden');
    }, 300);
}

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    // Clear previous timeout
    clearTimeout(passwordTimeout);
    
    // Hide error and strength initially
    hidePopup(passwordLengthError);
    hidePopup(passwordStrength);
    
    // Wait for user to finish typing (500ms delay)
    passwordTimeout = setTimeout(() => {
        // Check password length constraint (MUST be less than 8)
        if (password.length >= 8) {
            hidePopup(passwordStrength);
            showPopup(passwordLengthError);
            passwordInput.style.borderColor = '#ef4444';
            passwordInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
            return;
        }
        
        // Reset error styling if length is valid
        if (password.length > 0 && password.length < 8) {
            passwordInput.style.borderColor = '';
            passwordInput.style.boxShadow = '';
            hidePopup(passwordLengthError);
            
            // Show and calculate password strength
            calculatePasswordStrength(password);
        } else {
            hidePopup(passwordStrength);
            hidePopup(passwordLengthError);
        }
    }, 500);
});

// Password Strength Calculation
function calculatePasswordStrength(password) {
    if (password.length === 0) {
        hidePopup(passwordStrength);
        return;
    }
    
    let strength = 'weak';
    let strengthLevel = 0;
    
    // Check for letters
    const hasLetters = /[a-zA-Z]/.test(password);
    // Check for numbers
    const hasNumbers = /[0-9]/.test(password);
    // Check for special characters
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Determine strength
    if (password.length < 4) {
        strength = 'weak';
        strengthLevel = 1;
    } else if (hasLetters && hasNumbers && hasSpecial) {
        strength = 'strong';
        strengthLevel = 3;
    } else if ((hasLetters && hasNumbers) || (hasLetters && hasSpecial) || (hasNumbers && hasSpecial)) {
        strength = 'average';
        strengthLevel = 2;
    } else if (hasLetters || hasNumbers) {
        strength = 'weak';
        strengthLevel = 1;
    }
    
    // Update UI
    strengthText.textContent = strength;
    strengthText.className = 'strength-text ' + strength;
    strengthFill.className = 'strength-fill ' + strength;
    showPopup(passwordStrength);
}

// Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value;
    
    // Validate password length (MUST be less than 8)
    if (password.length >= 8) {
        showPopup(passwordLengthError);
        passwordInput.style.borderColor = '#ef4444';
        passwordInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
        
        // Shake animation
        passwordInput.style.animation = 'shakeError 0.5s ease';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
        
        passwordInput.focus();
        return;
    }
    
    // Validate all fields
    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('email').focus();
        return;
    }
    
    // Validate password is not empty
    if (password.length === 0) {
        alert('Please enter a password');
        passwordInput.focus();
        return;
    }
    
    // Add loading state
    const submitButton = signupForm.querySelector('.signup-button');
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Creating Account...</span>';
    
    // Simulate API call
    setTimeout(() => {
        console.log('Sign up attempt:', { firstName, lastName, email, password });
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Create Account</span><svg class="button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        
        // Success animation
        submitButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitButton.style.transform = 'scale(1)';
        }, 200);
        
        // In a real application, you would handle the response here
        // For demo purposes, redirect to login page after successful signup
        alert('Account created successfully! Redirecting to login...');
        setTimeout(() => {
            window.location.href = 'login_page.html';
        }, 1000);
    }, 1500);
});

// Smooth focus transitions
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement?.classList.remove('focused');
    });
});

// Add ripple effect to button
const signupButton = document.querySelector('.signup-button');
if (signupButton) {
    signupButton.addEventListener('click', function(e) {
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
}

// Add ripple styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .signup-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
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
    
    .signup-button.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .signup-button.loading .button-icon {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize - Add entrance animation
window.addEventListener('load', () => {
    const signupCard = document.getElementById('signupCard');
    if (signupCard) {
        signupCard.style.opacity = '0';
        signupCard.style.transform = 'scale(0.9) translateY(30px)';
        
        setTimeout(() => {
            signupCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            signupCard.style.opacity = '1';
            signupCard.style.transform = 'scale(1) translateY(0)';
        }, 100);
    }
});

