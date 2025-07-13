function initEventDetailsPage() {
  const eventId = getUrlParameter("id");

  if (!eventId) {
    showEventNotFound();
    return;
  }

  const event = getEventById(parseInt(eventId));

  if (!event) {
    showEventNotFound();
    return;
  }

  displayEventDetails(event);
  loadSimilarEvents(event);
  setupEventHandlers(event);
}

function displayEventDetails(event) {
  // Update page title
  document.title = `${event.name} - Event Locator`;

  // Update breadcrumb
  const breadcrumbEvent = document.getElementById("breadcrumbEvent");
  if (breadcrumbEvent) {
    breadcrumbEvent.textContent = event.name;
  }

  // Update event image
  const eventImage = document.getElementById("eventImage");
  const eventImageTitle = document.getElementById("eventImageTitle");
  if (eventImage && eventImageTitle) {
    eventImageTitle.textContent = event.name;
  }

  // Update basic info
  updateElementText("eventTitle", event.name);
  updateElementText("eventCategory", event.category);
  updateElementText(
    "eventDateTime",
    `${formatDate(event.date)} at ${event.time}`
  );
  updateElementText("eventLocation", event.location);
  updateElementText("eventDescription", event.description);
  updateElementText("eventPrice", event.price);
  updateElementText("eventPriceNote", event.priceNote);
  updateElementText("eventOrganizer", event.organizer);

  // Update quick info
  updateElementText("eventId", `#${event.id}`);
  updateElementText("eventDuration", event.duration);
  updateElementText("eventCapacity", event.capacity);
  updateElementText("eventAgeLimit", event.ageLimit);

  // Update contact info
  updateElementText("eventEmail", event.email);
  updateElementText("eventPhone", event.phone);

  const websiteLink = document.getElementById("eventWebsite");
  if (websiteLink) {
    websiteLink.href = event.website;
    websiteLink.textContent = event.website;
  }

  // Update tags
  const tagsContainer = document.getElementById("eventTags");
  if (tagsContainer && event.tags) {
    tagsContainer.innerHTML = event.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
  }

  // Show event details section
  const eventDetails = document.getElementById("eventDetails");
  if (eventDetails) {
    eventDetails.style.display = "block";
  }
}

function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

function showEventNotFound() {
  const eventDetails = document.getElementById("eventDetails");
  const eventNotFound = document.getElementById("eventNotFound");

  if (eventDetails) eventDetails.style.display = "none";
  if (eventNotFound) eventNotFound.style.display = "block";
}

function loadSimilarEvents(currentEvent) {
  const similarEventsContainer = document.getElementById("similarEvents");
  if (!similarEventsContainer) return;

  // Find events in the same category, excluding current event
  const similarEvents = eventsData
    .filter(
      (event) =>
        event.category === currentEvent.category && event.id !== currentEvent.id
    )
    .slice(0, 3); // Limit to 3 similar events

  if (similarEvents.length === 0) {
    similarEventsContainer.innerHTML =
      '<p class="text-muted">No similar events found.</p>';
    return;
  }

  similarEventsContainer.innerHTML = similarEvents
    .map(
      (event) => `
        <div class="card mb-2 small-event-card" onclick="viewEventDetails(${
          event.id
        })" style="cursor: pointer;">
            <div class="card-body p-2">
                <h6 class="card-title mb-1">${event.name}</h6>
                <p class="card-text small text-muted mb-1">
                    ${formatDateTime(event.date, event.time)}
                </p>
                <p class="card-text small mb-0">${event.location}</p>
                <div class="d-flex justify-content-between align-items-center mt-1">
                    <span class="badge bg-primary small">${
                      event.category
                    }</span>
                    <small class="text-success fw-bold">${event.price}</small>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function setupEventHandlers(event) {
  // Share button
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      shareEvent(event);
    });
  }

  // Buy tickets button
  const buyTicketsBtn = document.getElementById("buyTicketsBtn");
  if (buyTicketsBtn) {
    buyTicketsBtn.addEventListener("click", function () {
      buyTickets(event);
    });
  }
}

function shareEvent(event) {
  const shareData = {
    title: event.name,
    text: `Check out this event: ${event.name} on ${formatDate(event.date)}`,
    url: window.location.href,
  };

  if (navigator.share && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else {
    // Fallback: copy URL to clipboard
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        showNotification("Event URL copied to clipboard!");
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showNotification("Event URL copied to clipboard!");
      });
  }
}

function buyTickets(event) {
  // In a real application, this would redirect to a payment system
  // For demo purposes, we'll show an alert
  showNotification(`Redirecting to ticket purchase for ${event.name}...`);

  // Simulate redirect to external ticketing system
  setTimeout(() => {
    if (event.website && event.website !== "#") {
      window.open(event.website, "_blank");
    } else {
      showNotification("Ticket purchasing is not available for this event.");
    }
  }, 1000);
}

function showNotification(message) {
  // Create notification toast
  const toast = document.createElement("div");
  toast.className = "toast align-items-center text-white bg-primary border-0";
  toast.setAttribute("role", "alert");
  toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

  // Add to page
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className =
      "toast-container position-fixed bottom-0 end-0 p-3";
    document.body.appendChild(toastContainer);
  }

  toastContainer.appendChild(toast);

  // Show toast
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  // Remove after hiding
  toast.addEventListener("hidden.bs.toast", function () {
    toast.remove();
  });
}

// Add some additional styling for small event cards
const additionalCSS = `
    .small-event-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .small-event-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
`;

// Inject additional CSS
const style = document.createElement("style");
style.textContent = additionalCSS;
document.head.appendChild(style);

// Make function available globally
window.initEventDetailsPage = initEventDetailsPage;
