document.addEventListener('DOMContentLoaded', function () {
    // Authentication Forms toggle
    const showSignupBtn = document.getElementById("show-signup");
    const showLoginBtn = document.getElementById("show-login");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const authSection = document.getElementById("auth-section");
    const mainContent = document.getElementById("main-content");

    // Profile Photo Upload
    const profilePhotoInput = document.getElementById("photo-upload");
    const profilePhoto = document.getElementById("profile-photo");
    const usernameDisplay = document.getElementById("username-display");

    // Fitness Goals
    const goalStepsInput = document.getElementById("goal-steps");
    const goalCaloriesInput = document.getElementById("goal-calories");
    const setGoalsBtn = document.getElementById("set-goals");
    const goalMessage = document.getElementById("goal-message");

    // Nutrition Tracking
    const mealNameInput = document.getElementById("meal-name");
    const mealCaloriesInput = document.getElementById("meal-calories");
    const addMealBtn = document.getElementById("add-meal");
    const mealLog = document.getElementById("meal-log");

    // Daily Health Log
    const sleepHoursInput = document.getElementById("sleep-hours");
    const waterIntakeInput = document.getElementById("water-intake");
    const moodInput = document.getElementById("mood");
    const logHealthBtn = document.getElementById("log-health");
    const healthLogMessage = document.getElementById("health-log-message");

    // Progress Chart
    const ctx = document.getElementById('progress-chart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Fitness Progress',
                data: [10, 30, 50, 70, 90], // Dynamic data (steps, calories, etc.)
                fill: false,
                borderColor: 'rgba(52, 152, 219, 1)', // Line color
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Profile Photo Upload
    profilePhotoInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                profilePhoto.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Login Functionality
    document.getElementById("login").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        if (username && password) {
            // Login success
            authSection.style.display = "none";
            mainContent.style.display = "block";
            usernameDisplay.textContent = `Welcome, ${username}`;
        } else {
            alert("Please enter valid credentials.");
        }
    });

    // Signup Functionality
    document.getElementById("signup").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        if (password === confirmPassword && username) {
            alert("Signup successful! Please login.");
            signupForm.style.display = "none";
            loginForm.style.display = "block";
        } else {
            alert("Passwords do not match or invalid input.");
        }
    });

    // Set Fitness Goals
    setGoalsBtn.addEventListener("click", function () {
        const goalSteps = goalStepsInput.value;
        const goalCalories = goalCaloriesInput.value;

        if (goalSteps && goalCalories) {
            goalMessage.textContent = `Your fitness goals have been set: ${goalSteps} steps, ${goalCalories} calories.`;
            goalMessage.style.color = "#2ecc71"; // Green for success
        } else {
            goalMessage.textContent = "Please fill in both fields.";
            goalMessage.style.color = "#e74c3c"; // Red for error
        }
    });

    // Add Meal to Nutrition Tracking
    addMealBtn.addEventListener("click", function () {
        const mealName = mealNameInput.value;
        const mealCalories = mealCaloriesInput.value;

        if (mealName && mealCalories) {
            const mealEntry = document.createElement("div");
            mealEntry.classList.add("meal-entry");
            mealEntry.textContent = `${mealName} - ${mealCalories} Calories`;
            mealLog.appendChild(mealEntry);
            mealNameInput.value = "";
            mealCaloriesInput.value = "";
        } else {
            alert("Please fill in both fields.");
        }
    });

    // Log Daily Health Data
    logHealthBtn.addEventListener("click", function () {
        const sleepHours = sleepHoursInput.value;
        const waterIntake = waterIntakeInput.value;
        const mood = moodInput.value;

        if (sleepHours && waterIntake && mood) {
            healthLogMessage.textContent = `Logged: ${sleepHours} hours of sleep, ${waterIntake}L water, Mood: ${mood}`;
            healthLogMessage.style.color = "#2ecc71"; // Green for success
        } else {
            healthLogMessage.textContent = "Please fill in all fields.";
            healthLogMessage.style.color = "#e74c3c"; // Red for error
        }
    });

    // Chart Update Functionality (Simulated Progress Update)
    function updateProgressChart(newData) {
        progressChart.data.datasets[0].data.push(newData);
        progressChart.data.labels.push(`Week ${progressChart.data.labels.length + 1}`);
        progressChart.update();
    }

    // Simulate Fitness Progress Update
    setInterval(function () {
        const newData = Math.floor(Math.random() * 100) + 100; // Random new data for fitness progress
        updateProgressChart(newData);
    }, 5000); // Update chart every 5 seconds for demo purposes
});
