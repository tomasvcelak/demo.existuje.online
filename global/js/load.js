// loadMenu.js
document.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.getElementById('menu-container');
  
    // Fetch the menu.html file
    const response = await fetch('menu.html');
    const text = await response.text();
  
    // Create a temporary DOM element to parse the fetched content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
  
    // Get the template element from the fetched content
    const template = tempDiv.querySelector('#menu-template');
  
    // Clone the template content
    const clone = template.content.cloneNode(true);
  
    // Append the cloned content to the menu container in index.html
    menuContainer.appendChild(clone);
  });
  