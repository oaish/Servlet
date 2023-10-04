<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="css/authentication.css">
    <title>TalkWave | SignUp</title>
</head>
<body>
<div class="login-container" id="login-container">
    <h2>Sign Up</h2>
    <form class="login-form" id="signup-form" action="" method="POST">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required>
        </div>
        <div class="form-group">
            <input type="submit" id="submit-button" value="Proceed" disabled>
        </div>
    </form>
</div>

<div class="login-container" id="lg-2" style="display: none;">
    <h2>Customize your Profile</h2>
    <form class="login-form" id="signup-form2" action="" method="POST">
        <div class="form-group form-group-btn">
            <input class="su-p2" type="submit" id="finish-button" value="Finish" disabled>
            <input class="su-p2" type="button" id="back-button" value="Go Back">
        </div>
    </form>
</div>
<script src="js/authentication.js"></script>
</body>
</html>
