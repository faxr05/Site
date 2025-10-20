document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const pages = document.querySelectorAll('.page');
    const menuItems = document.querySelectorAll('.menu-item');
    const shoppingBag = document.getElementById('shopping-bag');
    const bagItemCount = document.getElementById('bag-item-count');
    const orderCountNav = document.getElementById('order-count');
    const orderList = document.getElementById('order-list');
    const orderTotalDisplay = document.getElementById('order-total');
    const signInForm = document.getElementById('signin-form');
    const locationResultsDiv = document.getElementById('location-results');
    const orderedPageButton = document.querySelector('.nav-button[data-target="page-ordered"]'); // Button in nav for order count
    const foodPageButton = document.querySelector('.nav-button[data-target="page-food"]'); // Default page button

    let order = []; // Array to hold items { name: '...', price: ... }
    let orderTotal = 0;

    // --- Navigation Logic ---
    function setActivePage(targetId) {
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        // Deactivate all nav buttons
        navButtons.forEach(button => button.classList.remove('active'));

        // Show target page
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Activate target button
        const targetButton = document.querySelector(`.nav-button[data-target="${targetId}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }

        // Special action for location page
        if (targetId === 'page-locations') {
            loadLocations(); // Load locations when tab is clicked
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            setActivePage(targetId);
        });
    });

    // --- Add to Order Logic ---
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-name');
            const price = parseFloat(item.getAttribute('data-price'));

            // Add item to order array
            order.push({ name, price });
            orderTotal += price;

            // Update UI
            updateOrderPage();
            updateBagCount();
            animateBag();
        });
    });

    // --- Update Order Page Display ---
    function updateOrderPage() {
        orderList.innerHTML = ''; // Clear current list

        if (order.length === 0) {
            orderList.innerHTML = '<p>Your bag is empty.</p>';
        } else {
            order.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('order-item');
                itemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                `;
                orderList.appendChild(itemElement);
            });
        }

        orderTotalDisplay.textContent = `Total: $${orderTotal.toFixed(2)}`;
    }

    // --- Update Bag Counter ---
    function updateBagCount() {
         const count = order.length;
         bagItemCount.textContent = count;
         orderCountNav.textContent = count; // Update count in nav bar too
         bagItemCount.style.display = count > 0 ? 'flex' : 'none'; // Show/hide bubble
    }

    // --- Bag Animation ---
    function animateBag() {
        shoppingBag.classList.add('animate');
        // Remove class after animation ends
        setTimeout(() => {
            shoppingBag.classList.remove('animate');
        }, 500); // Duration should match CSS animation duration
    }

     // --- Make bag icon clickable to go to order page ---
     shoppingBag.addEventListener('click', () => {
        setActivePage('page-ordered');
     });

    // --- Sign In Form Logic (Placeholder) ---
    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const age = document.getElementById('age').value;
            console.log('Sign in attempt:', { email, password, age });
            alert('Sign in functionality is not implemented in this demo.');
            // In a real app, you'd send this data to a server here
        });
    }


    // --- Location Loading Logic ---
    function loadLocations() {
        // In a real app, you might use navigator.geolocation here
        // For now, we'll just show placeholder text and trigger a search
        locationResultsDiv.innerHTML = '<p>Finding nearby locations in Capay Valley...</p>';

        // Simulate fetching data (or use the search tool result)
        // This is where you'd integrate map API results if you had them.
        // For this example, just putting pre-found info or search results.
        setTimeout(() => { // Simulate network delay
            locationResultsDiv.innerHTML = `
                <p>Based on general search (check current hours/availability):</p>
                <ul>
                    <li>Road Trip Bar & Grill - 17218 County Road 81, Capay, CA 95607</li>
                    <li>(More potential locations based on specific search results for "food" or "restaurants" in Capay Valley would go here)</li>
                </ul>
                <p><em>Note: Real-time closest location requires GPS and mapping services. This is illustrative.</em></p>
            `;
        }, 1000); // 1 second delay
         // Perform the actual search using the tool:
        findCapayValleyLocations(); // Call the search function
    }

    // Function to trigger the search tool
    function findCapayValleyLocations() {
        // This function doesn't *directly* run the tool in the browser JS.
        // It signifies that the backend/environment running this needs to perform this search.
        // The placeholder text above is shown while the *actual* search should happen via the tool.
        console.log("Requesting search for 'Road trip food locations Capay Valley CA'");
         // In a real integrated environment, the result of the search tool below
         // would ideally be used to update `locationResultsDiv.innerHTML`.
         /* Tool Call Simulation Placeholder */
        

    }


    // --- Initial Setup ---
    setActivePage('page-food'); // Start on the food page
    updateOrderPage(); // Initialize order page display
    updateBagCount(); // Initialize bag count display
});
