document.addEventListener('DOMContentLoaded', () => {
  // Sample CSV data
const csvData = `Herb,Level,Contribution,Conquest
Senrik,23473,502993,125
tekly,22057,121827,113
Gnopain,22080,151233,112
poniu,20007,141468,104
落澄月,19518,181728,103
Jackboy,19384,214122,103
Mikmik,18738,282055,102
Resurrectionx3,19635,371519,101
Qqrage,18992,361248,101
Omgitsu,19604,78609,101
jjjjut,19137,190599,100
Waifuwu,18598,306911,97
Fugitive,18385,234030,96
PiroTree,18462,219472,96
Kibou,16970,186321,95
grasspack,17756,256456,95
Deeny,18518,372611,95
orbitGor,18025,315007,95
Locats,17846,216435,93
PizzaSheet,17727,25440,92
Rosumi,18311,248105,91
LeQuyen,17508,67959,91
SingersSword,16936,131817,86
Bolofski,17302,195336,84
Bryanth,16584,223448,83`;


  // Populate the table with CSV data
  function populateTable(csvData) {
    const tableBody = document.querySelector('tbody');
    const dataRows = csvData.split("\n").slice(1); // Skip the header row
    tableBody.innerHTML = ''; // Clear existing table rows

    dataRows.forEach((row, index) => {
      const rowData = row.split(",");
      const rowElement = document.createElement("tr");

      // Prepend a rank cell
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1; // Rank starts at 1
      rowElement.appendChild(rankCell);

      rowData.forEach(cellData => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        rowElement.appendChild(cell);
      });

      tableBody.appendChild(rowElement);
    });
  }

  // Function to sort the table
  function populateTable(csvData) {
    const tableBody = document.querySelector('tbody');
    const dataRows = csvData.split("\n").slice(1); // Skip header row in CSV
    tableBody.innerHTML = ''; // Clear table body

    dataRows.forEach((row, index) => {
      const rowData = row.split(",");
      const rowElement = document.createElement("tr");

      // Insert Rank cell at the beginning of each row
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1; // Rank number
      rowElement.appendChild(rankCell);

      // Append other cells
      rowData.forEach(cellData => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        rowElement.appendChild(cell);
      });

      tableBody.appendChild(rowElement);
    });
  }

  // Modified sortTable function
  function sortTable(column, isAscending) {
    const tableBody = document.querySelector('tbody');
    const rowsArray = Array.from(tableBody.querySelectorAll('tr'));

    // Adjust columnIndex for sorting, considering the first column is "Rank"
    // No need to add +1 since we're directly using the column's actual index in the table
    const columnIndex = Array.from(document.querySelectorAll('thead th'))
      .findIndex(th => th.textContent.trim().toLowerCase().includes(column));

    rowsArray.sort((a, b) => {
      let cellA = a.children[columnIndex].textContent.trim();
      let cellB = b.children[columnIndex].textContent.trim();

      // Attempt to convert cell values to numbers for proper numerical comparison
      let valA = parseFloat(cellA);
      let valB = parseFloat(cellB);

      // Check if the values are actual numeric values; if not, revert to string comparison
      valA = isNaN(valA) ? cellA.toUpperCase() : valA;
      valB = isNaN(valB) ? cellB.toUpperCase() : valB;

      if (isAscending) {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });

    // Re-append rows in sorted order and re-number ranks
    rowsArray.forEach((row, index) => {
      // Simply renumber the first cell as the rank, assuming it always contains the rank number
      row.firstChild.textContent = index + 1;
      tableBody.appendChild(row);
    });
  }

  // Setup click event listeners for sorting
  document.querySelectorAll('thead th').forEach((th, index) => {
    if (index > 0) { // Skip the first column (Rank) for sorting click events
      th.addEventListener('click', () => {
        const column = th.textContent.trim().toLowerCase();
        const isAscending = !th.classList.contains('asc');
        document.querySelectorAll('thead th').forEach(header => header.classList.remove('asc', 'desc'));
        th.classList.add(isAscending ? 'asc' : 'desc');
        sortTable(column, isAscending);
      });
    }
  });

  // Initial call to populate the table
  populateTable(csvData);
});

