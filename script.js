// DOM Elements
const form = document.getElementById("dataForm");
const tableBody = document.querySelector("#dataTable tbody");

// Data storage
const dataEntries = [];

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form data
    const entry = {
        archive: document.getElementById("archive").value,
        archiveCity: document.getElementById("archiveCity").value,
        signature: document.getElementById("signature").value,
        skrzynkaNr: document.getElementById("skrzynkaNr").value,
        kartaNr: document.getElementById("kartaNr").value,
        vols: document.getElementById("vols").value,
        year: document.getElementById("year").value,
        name: document.getElementById("name").value,
        author: document.getElementById("author").value,
        printingLocation: document.getElementById("printingLocation").value,
        annotations: document.getElementById("annotations").value,
        annotationCategory: document.getElementById("annotationCategory").value,
        photos: document.getElementById("photos").value,
        seen: document.getElementById("seen").value,
        online: document.getElementById("online").value,
    };

    // Add data to storage and table
    dataEntries.push(entry);
    addRowToTable(entry);

    // Reset form
    form.reset();

    // Update Charts
    updateCharts();
});

// Add row to table
function addRowToTable(entry) {
    const row = document.createElement("tr");

    Object.values(entry).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    tableBody.appendChild(row);
}

// Update Charts
function updateCharts() {
    const categories = {
        cities: {},
        archives: {},
        printingLocations: {},
        annotations: { Yes: 0, No: 0 },
        annotationCategories: {},
    };

    dataEntries.forEach((entry) => {
        // Count by archive
        categories.archives[entry.archive] = (categories.archives[entry.archive] || 0) + 1;

        // Count by city
        categories.cities[entry.archiveCity] = (categories.cities[entry.archiveCity] || 0) + 1;

        // Count by printing location
        categories.printingLocations[entry.printingLocation] =
            (categories.printingLocations[entry.printingLocation] || 0) + 1;

        // Count annotations
        categories.annotations[entry.annotations]++;

        // Count annotation categories
        if (entry.annotationCategory) {
            categories.annotationCategories[entry.annotationCategory] =
                (categories.annotationCategories[entry.annotationCategory] || 0) + 1;
        }
    });

    createPieChart("cityChart", "Calendars by City", categories.cities);
    createPieChart("printingLocationChart", "Calendars by Printing Location", categories.printingLocations);
    createPieChart("annotationsChart", "Annotations (Yes/No)", categories.annotations);
    createPieChart("annotationCategoryChart", "Annotation Categories", categories.annotationCategories);
}

// Create Pie Chart
function createPieChart(chartId, title, data) {
    const ctx = document.getElementById(chartId).getContext("2d");
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: title },
            },
        },
    });
}
