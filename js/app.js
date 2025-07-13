// Sample event data
const eventsData = [
  {
    id: 1,
    name: "Summer Music Festival",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    category: "music",
    description:
      "Join us for an amazing summer music festival featuring top artists from around the world. Experience live performances, food trucks, and great vibes in the heart of Central Park.",
    price: "$75",
    priceNote: "Early bird pricing",
    organizer: "NYC Events Co.",
    capacity: "5000",
    duration: "6 hours",
    ageLimit: "18+",
    email: "info@nycevents.com",
    phone: "+1 (555) 123-4567",
    website: "https://summermusicfest.com",
    tags: ["outdoor", "live-music", "festival", "food"],
    featured: true,
  },
  {
    id: 2,
    name: "Tech Conference 2024",
    date: "2024-08-22",
    time: "09:00",
    location: "Convention Center, San Francisco",
    category: "technology",
    description:
      "The biggest tech conference of the year featuring keynotes from industry leaders, workshops, and networking opportunities. Learn about the latest trends in AI, blockchain, and web development.",
    price: "$299",
    priceNote: "Includes lunch and materials",
    organizer: "Tech World Events",
    capacity: "2000",
    duration: "2 days",
    ageLimit: "All ages",
    email: "register@techconf2024.com",
    phone: "+1 (555) 987-6543",
    website: "https://techconf2024.com",
    tags: ["technology", "networking", "ai", "blockchain"],
    featured: true,
  },
  {
    id: 3,
    name: "Basketball Championship",
    date: "2024-09-10",
    time: "19:00",
    location: "Madison Square Garden, New York",
    category: "sports",
    description:
      "Witness the ultimate basketball showdown as the top teams compete for the championship title. Premium seating and exclusive merchandise available.",
    price: "$150",
    priceNote: "Starting price",
    organizer: "Sports Entertainment Inc.",
    capacity: "20000",
    duration: "3 hours",
    ageLimit: "All ages",
    email: "tickets@sportsent.com",
    phone: "+1 (555) 456-7890",
    website: "https://basketballchamps.com",
    tags: ["sports", "basketball", "championship", "indoor"],
    featured: false,
  },
  {
    id: 4,
    name: "Food & Wine Expo",
    date: "2024-07-28",
    time: "12:00",
    location: "Expo Center, Los Angeles",
    category: "food",
    description:
      "Discover the finest cuisine and wines from around the world. Chef demonstrations, wine tastings, and exclusive dining experiences await.",
    price: "$95",
    priceNote: "Includes tastings",
    organizer: "Culinary Events LA",
    capacity: "3000",
    duration: "8 hours",
    ageLimit: "21+",
    email: "info@foodwineexpo.com",
    phone: "+1 (555) 234-5678",
    website: "https://foodwineexpo.com",
    tags: ["food", "wine", "tasting", "culinary"],
    featured: true,
  },
  {
    id: 5,
    name: "Art Gallery Opening",
    date: "2024-08-05",
    time: "18:30",
    location: "Modern Art Museum, Chicago",
    category: "arts",
    description:
      "Experience contemporary art from emerging and established artists. Interactive installations, live performances, and networking with art enthusiasts.",
    price: "Free",
    priceNote: "Donations welcome",
    organizer: "Chicago Arts Council",
    capacity: "500",
    duration: "4 hours",
    ageLimit: "All ages",
    email: "events@chicagoarts.org",
    phone: "+1 (555) 345-6789",
    website: "https://chicagoarts.org",
    tags: ["arts", "gallery", "contemporary", "culture"],
    featured: false,
  },
  {
    id: 6,
    name: "Business Networking Summit",
    date: "2024-09-18",
    time: "08:00",
    location: "Business Center, Miami",
    category: "business",
    description:
      "Connect with industry leaders, entrepreneurs, and investors. Panel discussions, workshops, and exclusive networking sessions.",
    price: "$199",
    priceNote: "Includes breakfast and lunch",
    organizer: "Miami Business Network",
    capacity: "800",
    duration: "1 day",
    ageLimit: "18+",
    email: "connect@miamibusiness.net",
    phone: "+1 (555) 567-8901",
    website: "https://miamibusinesssummit.com",
    tags: ["business", "networking", "entrepreneurs", "professional"],
    featured: false,
  },
  {
    id: 7,
    name: "Educational Workshop: Digital Marketing",
    date: "2024-07-20",
    time: "10:00",
    location: "Learning Center, Austin",
    category: "education",
    description:
      "Master digital marketing strategies including SEO, social media marketing, and content creation. Hands-on workshops and expert guidance.",
    price: "$149",
    priceNote: "Materials included",
    organizer: "Austin Learning Hub",
    capacity: "100",
    duration: "6 hours",
    ageLimit: "16+",
    email: "learn@austinhub.edu",
    phone: "+1 (555) 678-9012",
    website: "https://austinlearning.com",
    tags: ["education", "digital-marketing", "workshop", "skills"],
    featured: false,
  },
  {
    id: 8,
    name: "Comedy Night Live",
    date: "2024-08-12",
    time: "20:00",
    location: "Comedy Club, Las Vegas",
    category: "entertainment",
    description:
      "Laugh the night away with top comedians from around the country. Special guest appearances and surprise performances.",
    price: "$45",
    priceNote: "2-drink minimum",
    organizer: "Vegas Comedy Productions",
    capacity: "300",
    duration: "3 hours",
    ageLimit: "21+",
    email: "laughs@vegascomedy.com",
    phone: "+1 (555) 789-0123",
    website: "https://vegascomedyclub.com",
    tags: ["entertainment", "comedy", "live-show", "nightlife"],
    featured: true,
  },
];

// Utility functions
function formatDate(dateString) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function formatDateTime(dateString, timeString) {
  const date = new Date(`${dateString}T${timeString}`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createEventCard(event, isLarge = false) {
  const cardClass = isLarge ? "col-md-6 col-lg-4" : "col-md-6 col-lg-3";

  return `
        <div class="${cardClass} mb-4 fade-in">
            <div class="card event-card h-100" onclick="viewEventDetails(${
              event.id
            })">
                <div class="card-img-top" style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);">
                    ${event.name}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text text-muted small">
                        <i class="fas fa-calendar me-1"></i>${formatDateTime(
                          event.date,
                          event.time
                        )}<br>
                        <i class="fas fa-map-marker-alt me-1"></i>${
                          event.location
                        }
                    </p>
                    <p class="card-text flex-grow-1">${event.description.substring(
                      0,
                      100
                    )}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="badge bg-primary">${event.category}</span>
                        <strong class="text-success">${event.price}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function viewEventDetails(eventId) {
  window.location.href = `event-details.html?id=${eventId}`;
}

function getEventById(id) {
  return eventsData.find((event) => event.id === parseInt(id));
}

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function filterEvents(searchTerm = "", dateFilter = "", categoryFilter = "") {
  return eventsData.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || event.category === categoryFilter;

    const eventDate = new Date(event.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let matchesDate = true;
    if (dateFilter !== "") {
      switch (dateFilter) {
        case "today":
          matchesDate = eventDate.toDateString() === today.toDateString();
          break;
        case "tomorrow":
          matchesDate = eventDate.toDateString() === tomorrow.toDateString();
          break;
        case "this-week":
          const weekFromNow = new Date(today);
          weekFromNow.setDate(today.getDate() + 7);
          matchesDate = eventDate >= today && eventDate <= weekFromNow;
          break;
        case "this-month":
          matchesDate =
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear();
          break;
        case "upcoming":
          matchesDate = eventDate >= today;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesDate;
  });
}

// Initialize page based on current location
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  switch (currentPage) {
    case "index.html":
    case "":
      initHomePage();
      break;
    case "events.html":
      initEventsPage();
      break;
    case "event-details.html":
      initEventDetailsPage();
      break;
  }
});

// Home page initialization
function initHomePage() {
  // Display featured events
  const featuredEvents = eventsData.filter((event) => event.featured);
  const featuredContainer = document.getElementById("featuredEvents");

  if (featuredContainer) {
    featuredContainer.innerHTML = featuredEvents
      .map((event) => createEventCard(event, true))
      .join("");
  }

  // Handle search form submission
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchTerm = document.getElementById("searchInput").value;
      const dateFilter = document.getElementById("dateFilter").value;
      const categoryFilter = document.getElementById("categoryFilter").value;

      // Redirect to events page with filters
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (dateFilter) params.set("date", dateFilter);
      if (categoryFilter) params.set("category", categoryFilter);

      window.location.href = `events.html?${params.toString()}`;
    });
  }
}

// Export functions for use in other files
window.eventsData = eventsData;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.createEventCard = createEventCard;
window.viewEventDetails = viewEventDetails;
window.getEventById = getEventById;
window.getUrlParameter = getUrlParameter;
window.filterEvents = filterEvents;
