document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const powerLogo = document.getElementById("power-logo");
    const content = document.getElementById("content"); // Only used if dynamically loading content

    // Function to load page content dynamically if using a single-page structure
    function loadPage(page) {
        if (!content) {
            // If #content does not exist, navigate normally
            window.location.href = `${page}.html`;
            return;
        }

        fetch(`${page}.html`)
            .then(response => response.ok ? response.text() : Promise.reject("Page not found"))
            .then(html => {
                content.innerHTML = html;
                updateActiveLink(page);
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Function to update active navigation link
    function updateActiveLink(activePage) {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.page === activePage);
        });
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const page = this.dataset.page;

            if (content) {
                event.preventDefault(); // Prevent default only if dynamically loading content
                loadPage(page);
            }
        });
    });

    // Click event for the power logo to redirect to the home page
    if (powerLogo) {
        powerLogo.addEventListener("click", () => window.location.href = "index.html");
    }

    // If using a dynamic content structure, load the default home page
    if (content) {
        loadPage("home");
    }

   

});
