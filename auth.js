class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Form submissions
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
    }

    switchTab(tabName) {
        document.querySelectorAll('.auth-form').forEach(form => form.style.display = 'none');
        document.getElementById(`${tabName}-form`).style.display = 'block';
        
        document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.loginSuccess(user);
        } else {
            alert('Invalid credentials');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (this.users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        const newUser = { username, email, password, scores: [] };
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.loginSuccess(newUser);
    }

    loginSuccess(user) {
        this.currentUser = user;
        document.getElementById('auth-container').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        // Update quiz app to show username
        document.querySelector('h1').textContent = `Welcome ${user.username}`;
    }
}

const auth = new Auth();