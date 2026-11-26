const list = document.querySelector("#starred");
const status = document.querySelector("#status");

async function loadEvents() {
  status.textContent = "Loading starred repositories...";

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status})`);
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error("The repository data is not in the expected format.");
    }

    for (const event of events) {
      if (
        typeof event.name !== "string" ||
        typeof event.starred !== "string"
      ) {
        throw new Error("A repository entry is missing required information.");
      }

      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    }

    status.textContent = `Loaded ${events.length} starred ${
      events.length === 1 ? "repository" : "repositories"
    }.`;
  } catch (error) {
    status.setAttribute("role", "alert");
    status.textContent =
      "Sorry, the starred repositories could not be loaded.";
    console.error(error);
  }
}

loadEvents();