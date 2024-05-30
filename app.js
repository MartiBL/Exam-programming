"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects(); // Call getProjects function to fetch project data
  displayProjectsGrid(projects); // Call displayProjectsGrid function to display projects
}

// Function to fetch projects from the API
async function getProjects() {
  const response = await fetch("https://exampractice.martinblazhev.dk/wp-json/wp/v2/posts?acf_format=standard"); // Fetch project data from API
  const data = await response.json(); // Convert response to JSON format
  return data; // Return the project data
}

// Function to display projects in a grid
function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#projects-list"); // Select the container for projects
  for (const project of projects) { // Loop through each project
    projectsGrid.insertAdjacentHTML(
      "beforeend", // Insert HTML at the end of the container
      /*html*/ `
      <article class="grid-item">
        <img src="${project.acf.project_image}" alt="${project.title.rendered}" /> <!-- Display project image -->
        <div class="grid-item-content">
          <h2>${project.title.rendered}</h2> <!-- Display project title -->
          <p>${project.acf.project_description}</p> <!-- Display project description -->
        </div>
        <div class="project-info">
          <p>${project.acf.project_client}</p> <!-- Display project client -->
          <a href="${project.acf.project_link}">Link to solution</a> <!-- Display link to project solution -->
        </div>
      </article>
    `
    //In this part the link and client are split from the image, description and title
    );
  }
}
