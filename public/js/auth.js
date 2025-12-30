/**
 * Authentication Helper Functions
 */

const Auth = {
    // Key for storing auth state in localStorage
    AUTH_KEY: 'gigikala_auth',

    /**
     * Attempt to login with given credentials
     * @param {string} identifier - Username or Email
     * @param {string} password - Password
     * @returns {object} result - { success: boolean, message: string, user: object }
     */
    login: function (identifier, password) {
        if (!window.users) {
            console.error("User data not loaded!");
            return { success: false, message: "خطا در بارگذاری اطلاعات کاربران" };
        }

        const user = window.users.find(u =>
            (u.username === identifier || u.email === identifier) && u.password === password
        );

        if (user) {
            // Save to local storage
            const authData = {
                isAuthenticated: true,
                user: user,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
            return { success: true, user: user };
        } else {
            return { success: false, message: "نام کاربری یا رمز عبور اشتباه است" };
        }
    },

    /**
     * Check if user is currently logged in
     * @returns {object|null} user object if logged in, null otherwise
     */
    getCurrentUser: function () {
        const authData = localStorage.getItem(this.AUTH_KEY);
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed.isAuthenticated) {
                    return parsed.user;
                }
            } catch (e) {
                console.error("Error parsing auth data", e);
                this.logout();
            }
        }
        return null;
    },

    /**
     * Logout the current user
     */
    logout: function () {
        localStorage.removeItem(this.AUTH_KEY);
        window.location.reload();
    },

    /**
     * Update the header UI based on auth state
     */
    updateHeader: function () {
        const currentUser = this.getCurrentUser();
        const userActions = document.querySelector('.user-actions');

        if (!userActions) return;

        if (currentUser) {
            // User is logged in
            userActions.innerHTML = `
                <div class="user-dropdown-container">
                    <div class="user-profile-trigger">
                        <i class="fas fa-user"></i>
                        <span class="username">${currentUser.name || currentUser.username}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="user-dropdown-menu">
                        <div class="user-info-header" onclick="window.location.href='profile.html'" style="cursor: pointer;">
                            <div class="user-avatar-small">
                                <img src="${currentUser.avatar || 'public/icons/default-avatar.png'}" alt="${currentUser.username}" onerror="this.src='public/icons/user.png'">
                            </div>
                            <div class="user-details-text">
                                <span class="user-full-name">${currentUser.name}</span>
                                <span class="user-phone">${currentUser.username}</span> <!-- Using username as phone/id proxy -->
                            </div>
                            <i class="fas fa-chevron-left" style="margin-right: auto; color: #a1a3a8;"></i>
                        </div>
                        <ul class="user-menu-items">
                            <li>
                                <a href="#">
                                    <div class="menu-item-icon"><i class="fas fa-crown"></i></div>
                                    <span>دیجی‌کلاب</span>
                                    <span class="menu-badge">۰ امتیاز</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="menu-item-icon"><i class="fas fa-star"></i></div>
                                    <span>پلاس</span>
                                    <a href="#" class="menu-link-action">تمدید ></a>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div class="menu-item-icon"><i class="fas fa-shopping-bag"></i></div>
                                    <span>سفارش‌ها</span>
                                </a>
                            </li>
                             <li>
                                <a href="#">
                                    <div class="menu-item-icon"><i class="fas fa-heart"></i></div>
                                    <span>لیست‌ها</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="menu-item-icon"><i class="fas fa-comment"></i></div>
                                    <span>دیدگاه‌ها و پرسش‌ها</span>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#" onclick="Auth.logout(); return false;">
                                    <div class="menu-item-icon"><i class="fas fa-sign-out-alt"></i></div>
                                    <span>خروج از حساب کاربری</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Notification Icon -->
                <div class="header-notification">
                    <i class="far fa-bell"></i>
                </div>
            `;

            // Add class for styling logic if needed
            userActions.classList.add('logged-in');

            // Find existing cart icon and ensure it's positioned correctly
            // The notification icon is added plain in the HTML above.
        } else {
            // User is not logged in (Default state)
            userActions.innerHTML = `
                <a href="login.html" class="login-link-container">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>ورود | ثبت‌نام</span>
                </a>
            `;
            userActions.classList.remove('logged-in');
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only run updateHeader if we are NOT on the login page itself (to avoid conflicts if login page has different header)
    // checking if users variable exists (loaded from user-data.js)
    if (window.users) {
        Auth.updateHeader();
    } else {
        // Retry shortly in case of race condition with script loading
        setTimeout(() => {
            if (window.users) {
                Auth.updateHeader();
            }
        }, 100);
    }
});
