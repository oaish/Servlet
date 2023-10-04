document.addEventListener("DOMContentLoaded", function () {
    const signupPassword = document.getElementById('password');
    const signupConfirmPassword = document.getElementById('confirm-password');
    const submitButton = document.getElementById('submit-button');
    const goBackButton = document.getElementById('back-button');
    let signUpNextPage = false;

    function validatePassword() {
        const password = signupPassword.value;
        const confirmPassword = signupConfirmPassword.value;

        if (password !== confirmPassword) {
            signupConfirmPassword.setCustomValidity("Passwords do not match");
        } else {
            signupConfirmPassword.setCustomValidity("");
        }
    }

    signupPassword.addEventListener('input', validatePassword);
    signupConfirmPassword.addEventListener('input', validatePassword);

    document.getElementById('signup-form').addEventListener('input', function() {
        if (this.checkValidity()) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'true');
        }
    });

    validatePassword();

    submitButton.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form submission, as we're handling it here
        signUpNextPage = true;

        document.getElementById("login-container").style.display = "none";
        document.getElementById("lg-2").style.display = "block";
    });

    goBackButton.addEventListener("click", function () {
        signUpNextPage = false;

        document.getElementById("login-container").style.display = "block";
        document.getElementById("lg-2").style.display = "none";
    });
});