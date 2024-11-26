document.getElementById("processData").addEventListener("click", function () {
    const rawData = document.getElementById("dataInput").value;

    // Parse data (assuming tab-separated from Excel)
    const rows = rawData.split("\n").map(row => row.split("\t"));

    // Define categories
    const categories = {
        cities: {},
        printingLocations: {},
        annotations: { Yes: 0, No: 0 },
        annotationCategories: {}
    };

    // Skip the first row (headers)
    rows.slice(1).forEach(row => {
        const [
            archiveCity, signature, skrzynkaNr, kartaNr, vols, year, name, author,
            printingLocation, annotations, annotationCategory, photos, seen, online
        ] = row;

        // Count by city
        if (archiveCity) {
            categories.cities[archiveCity] = (categories.cities[archiveCity] || 0) + 1;
        }

        // Count by printing location
        if (printingLocation) {
            categories.printingLocations[printingLocation] = (categories.printingLocations[printingLocation] || 0) + 1;
        }

        // Count annotations
        if (annotations) {
            categories.annotations[annotations] = (categories.annotations[annotations] || 0) + 1;
        }

        // Count annotation categories
        if (annotationCategory) {
            categories.annotationCategories[annotationCategory] =
                (categories.annotationCategories[annotationCategory] || 0) + 1;
        }
    });

    // Create Charts
    createPieChart("cityChart", "Calendars by City", categories.cities);
    createPieChart("printingLocationChart", "Calendars by Printing Location", categories.printingLocations);
    createPieChart("annotationsChart", "Annotations (Yes/No)", categories.annotations);
    createPieChart("annotationCategoryChart", "Annotation Categories", categories.annotationCategories);
});

function createPieChart(chartId, title, data) {
    const ctx = document.getElementById(chartId).getContext("2d");
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: values,
                backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff"],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: title }
            }
        }
    });
}
