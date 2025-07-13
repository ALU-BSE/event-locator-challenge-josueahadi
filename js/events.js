let currentEvents = [];
let currentPage = 1;
const eventsPerPage = 6;
let currentFilters = {
  search: "",
  date: "",
  category: "",
  sort: "date",
};

function initEventsPage() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  currentFilters.search = urlParams.get("search") || "";
  currentFilters.date = urlParams.get("date") || "";
  currentFilters.category = urlParams.get("category") || "";

  // Set form values from URL
  const searchInput = document.getElementById("searchInput");
  const dateFilter = document.getElementById("dateFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortBy = document.getElementById("sortBy");

  if (searchInput) searchInput.value = currentFilters.search;
  if (dateFilter) dateFilter.value = currentFilters.date;
  if (categoryFilter) categoryFilter.value = currentFilters.category;

  // Add event listeners
  setupEventListeners();

  // Load and display events
  loadEvents();
}

function setupEventListeners() {
  // Filter buttons
  const applyFiltersBtn = document.getElementById("applyFilters");
  const clearFiltersBtn = document.getElementById("clearFilters");
  const sortBy = document.getElementById("sortBy");

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", applyFilters);
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearFilters);
  }

  if (sortBy) {
    sortBy.addEventListener("change", function () {
      currentFilters.sort = this.value;
      loadEvents();
    });
  }

  // Real-time search
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentFilters.search = this.value;
        currentPage = 1;
        loadEvents();
      }, 300);
    });
  }

  // Filter dropdowns
  const dateFilter = document.getElementById("dateFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  if (dateFilter) {
    dateFilter.addEventListener("change", function () {
      currentFilters.date = this.value;
      currentPage = 1;
      loadEvents();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      currentFilters.category = this.value;
      currentPage = 1;
      loadEvents();
    });
  }
}

function applyFilters() {
  const searchInput = document.getElementById("searchInput");
  const dateFilter = document.getElementById("dateFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  currentFilters.search = searchInput ? searchInput.value : "";
  currentFilters.date = dateFilter ? dateFilter.value : "";
  currentFilters.category = categoryFilter ? categoryFilter.value : "";
  currentPage = 1;

  loadEvents();
  updateURL();
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("dateFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("sortBy").value = "date";

  currentFilters = {
    search: "",
    date: "",
    category: "",
    sort: "date",
  };
  currentPage = 1;

  loadEvents();
  updateURL();
}

function loadEvents() {
  // Filter events
  currentEvents = filterEvents(
    currentFilters.search,
    currentFilters.date,
    currentFilters.category
  );

  // Sort events
  sortEvents(currentEvents, currentFilters.sort);

  // Update event count
  updateEventCount();

  // Display events for current page
  displayEvents();

  // Update pagination
  updatePagination();
}

function sortEvents(events, sortBy) {
  events.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      case "date":
      default:
        return new Date(a.date) - new Date(b.date);
    }
  });
}

function displayEvents() {
  const eventsList = document.getElementById("eventsList");
  const noEvents = document.getElementById("noEvents");

  if (!eventsList) return;

  // Calculate pagination
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const eventsToShow = currentEvents.slice(startIndex, endIndex);

  if (eventsToShow.length === 0) {
    eventsList.innerHTML = "";
    if (noEvents) noEvents.style.display = "block";
    return;
  }

  if (noEvents) noEvents.style.display = "none";

  // Create event cards
  eventsList.innerHTML = eventsToShow
    .map((event) => createEventCard(event))
    .join("");

  // Add fade-in animation
  setTimeout(() => {
    const cards = eventsList.querySelectorAll(".fade-in");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });
  }, 50);
}

function updateEventCount() {
  const eventCount = document.getElementById("eventCount");
  if (eventCount) {
    const total = currentEvents.length;
    const start = (currentPage - 1) * eventsPerPage + 1;
    const end = Math.min(currentPage * eventsPerPage, total);

    if (total === 0) {
      eventCount.textContent = "No events found";
    } else {
      eventCount.textContent = `Showing ${start}-${end} of ${total} events`;
    }
  }
}

function updatePagination() {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let paginationHTML = "";

  // Previous button
  paginationHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${
              currentPage - 1
            })">Previous</a>
        </li>
    `;

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(1)">1</a>
            </li>
        `;
    if (startPage > 2) {
      paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
    paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="changePage(${totalPages})">${totalPages}</a>
            </li>
        `;
  }

  // Next button
  paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${
              currentPage + 1
            })">Next</a>
        </li>
    `;

  pagination.innerHTML = paginationHTML;
}

function changePage(page) {
  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  displayEvents();
  updateEventCount();
  updatePagination();

  // Scroll to top of events list
  const eventsList = document.getElementById("eventsList");
  if (eventsList) {
    eventsList.scrollIntoView({ behavior: "smooth" });
  }
}

function updateURL() {
  const params = new URLSearchParams();

  if (currentFilters.search) params.set("search", currentFilters.search);
  if (currentFilters.date) params.set("date", currentFilters.date);
  if (currentFilters.category) params.set("category", currentFilters.category);

  const newURL =
    window.location.pathname +
    (params.toString() ? "?" + params.toString() : "");
  window.history.replaceState({}, "", newURL);
}

// Make functions available globally
window.changePage = changePage;
window.initEventsPage = initEventsPage;
