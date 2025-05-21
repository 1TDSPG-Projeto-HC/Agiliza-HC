 document.addEventListener('DOMContentLoaded', () => {
            const loginButton = document.getElementById('login-button');
            const logoutButton = document.getElementById('logout-button');
            const welcomeMessage = document.getElementById('welcome-message');
            const mainNav = document.getElementById('main-nav'); // Get the navigation ul

            function updateHeaderLoginState() {
                const isLoggedIn = sessionStorage.getItem('isLoggedIn');
                const username = sessionStorage.getItem('username') || 'Usuário';

                if (isLoggedIn === 'true') {
                    loginButton.style.display = 'none';
                    logoutButton.style.display = 'inline-block';
                    welcomeMessage.style.display = 'inline-block';
                    welcomeMessage.textContent = `Olá, ${username}!`;
                    // You can add logic here to show/hide specific nav items if needed
                    // For now, all nav items are always visible, and login state is shown in header.
                } else {
                    loginButton.style.display = 'inline-block';
                    logoutButton.style.display = 'none';
                    welcomeMessage.style.display = 'none';
                }
            }

            logoutButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('username');
                window.location.href = 'index.html'; // Redirect to home page after logout
            });

            // Initial update when the page loads
            updateHeaderLoginState();
        });

      document.addEventListener('DOMContentLoaded', () => {
            const loginButton = document.getElementById('login-button');
            const logoutButton = document.getElementById('logout-button');
            const welcomeMessage = document.getElementById('welcome-message');
            
            const loginSection = document.getElementById('login-section');
            const registerSection = document.getElementById('register-section');
            const showRegisterLink = document.getElementById('show-register');
            const showLoginLink = document.getElementById('show-login');

            const loginForm = document.getElementById('login-form');
            const loginUsernameInput = document.getElementById('login-username');
            const loginPasswordInput = document.getElementById('login-password');
            const loginMessage = document.getElementById('login-message');

            const registerForm = document.getElementById('register-form');
            const registerUsernameInput = document.getElementById('register-username');
            const registerEmailInput = document.getElementById('register-email');
            const registerPasswordInput = document.getElementById('register-password');
            const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
            const registerMessage = document.getElementById('register-message');

            // Simulate user storage (in a real app, this would be a database)
            // Using localStorage to persist users across browser sessions for demo
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || {};

            function saveUsers() {
                localStorage.setItem('registeredUsers', JSON.stringify(users));
            }

            function updateHeaderLoginState() {
                const isLoggedIn = sessionStorage.getItem('isLoggedIn');
                const username = sessionStorage.getItem('username') || 'Usuário';

                if (isLoggedIn === 'true') {
                    loginButton.style.display = 'none';
                    logoutButton.style.display = 'inline-block';
                    welcomeMessage.style.display = 'inline-block';
                    welcomeMessage.textContent = `Olá, ${username}!`;
                } else {
                    loginButton.style.display = 'inline-block';
                    logoutButton.style.display = 'none';
                    welcomeMessage.style.display = 'none';
                }
            }

            // Function to display messages
            function displayMessage(element, message, type) {
                element.textContent = message;
                element.className = 'message-box ' + type;
                element.style.display = 'block';
            }

            // Handle login form submission
            if (loginForm) {
                loginForm.addEventListener('submit', (event) => {
                    event.preventDefault();

                    const username = loginUsernameInput.value;
                    const password = loginPasswordInput.value;

                    if (users[username] && users[username].password === password) {
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('username', username);
                        displayMessage(loginMessage, 'Login bem-sucedido!', 'success');
                        setTimeout(() => {
                            window.location.href = 'index.html'; // Redirect to home page
                        }, 1000);
                    } else {
                        displayMessage(loginMessage, 'Usuário ou senha inválidos.', 'error');
                    }
                });
            }

            // Handle registration form submission
            if (registerForm) {
                registerForm.addEventListener('submit', (event) => {
                    event.preventDefault();

                    const username = registerUsernameInput.value;
                    const email = registerEmailInput.value;
                    const password = registerPasswordInput.value;
                    const confirmPassword = registerConfirmPasswordInput.value;

                    if (password !== confirmPassword) {
                        displayMessage(registerMessage, 'As senhas não coincidem.', 'error');
                        return;
                    }

                    if (users[username]) {
                        displayMessage(registerMessage, 'Nome de usuário já existe.', 'error');
                        return;
                    }

                    // Basic email validation
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        displayMessage(registerMessage, 'Por favor, insira um email válido.', 'error');
                        return;
                    }

                    users[username] = { email: email, password: password };
                    saveUsers();
                    displayMessage(registerMessage, 'Cadastro realizado com sucesso! Você pode fazer login agora.', 'success');
                    
                    // Clear registration form
                    registerUsernameInput.value = '';
                    registerEmailInput.value = '';
                    registerPasswordInput.value = '';
                    registerConfirmPasswordInput.value = '';

                    // Optionally switch to login form after successful registration
                    setTimeout(() => {
                        loginSection.style.display = 'block';
                        registerSection.style.display = 'none';
                        displayMessage(loginMessage, 'Faça login com sua nova conta.', 'success');
                    }, 1500);
                });
            }

            // Handle logout button click
            if (logoutButton) {
                logoutButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    sessionStorage.removeItem('isLoggedIn');
                    sessionStorage.removeItem('username');
                    window.location.href = 'index.html'; // Redirect to home page after logout
                });
            }

            // Toggle between login and registration forms
            if (showRegisterLink) {
                showRegisterLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    loginSection.style.display = 'none';
                    registerSection.style.display = 'block';
                    loginMessage.style.display = 'none'; // Hide login message when switching
                });
            }

            if (showLoginLink) {
                showLoginLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    loginSection.style.display = 'block';
                    registerSection.style.display = 'none';
                    registerMessage.style.display = 'none'; // Hide register message when switching
                });
            }

            // Initial update when the page loads
            updateHeaderLoginState();
        });