const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


/*
    Mobile navigation
*/

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


/*
    Close mobile menu
    after clicking a navigation link
*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});


/*
    Active navigation link
*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});
/*
    PROJECT PAGINATION
*/

const projectCards = Array.from(
    document.querySelectorAll(".projects-grid .project-card")
);

const paginationContainer =
    document.getElementById("projectsPagination");

const projectsPerPage = 6;

let currentPage = 1;

function displayProjects(page) {

    const totalPages = Math.ceil(
        projectCards.length / projectsPerPage
    );

    if (totalPages === 0) return;

    currentPage = Math.max(1, Math.min(page, totalPages));

    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;

    projectCards.forEach((card, index) => {

        card.hidden = index < startIndex || index >= endIndex;

    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {

    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    if (totalPages <= 1) return;

    function createButton(label, page, disabled = false, active = false) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = label;
        button.className = "pagination-btn";

        if (active) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        button.disabled = disabled;

        button.addEventListener("click", () => {

            displayProjects(page);

            document.getElementById("projects")
                .scrollIntoView({ behavior: "smooth" });

        });

        paginationContainer.appendChild(button);
    }

    createButton("← Previous", currentPage - 1, currentPage === 1);

    for (let i = 1; i <= totalPages; i++) {

        createButton(i, i, false, i === currentPage);

    }

    createButton("Next →", currentPage + 1, currentPage === totalPages);
}

if (paginationContainer && projectCards.length > 0) {
    displayProjects(1);
}