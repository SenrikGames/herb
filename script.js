document.addEventListener('DOMContentLoaded', () => {
  // Sample CSV data
const csvData = `Herb,Level,Contribution,Conquest
Senrik,21856,275548,100
Anhjew,16525,178305,84
Qqrage,17302,171663,85
MikMik,17165,146887,90
Jackboy,17116,84450,84
Resurrectionx3,17671,173189,88
Rosumi,16706,125909,80
orbitGor,16745,170434,81
grasspack,16216,80476,77
PiroTree,16657,144148,80
Locats,16520,76173,82
Tankcat,16240,163167,82
Deeny,16521,185783,81
Bryanth,15192,111920,68
Kaza,14269,108925,60
TonTon,15364,108778,68
Waifuwu,16476,162413,79
Fugitive,16941,46455,85
Bolofski,15613,34644,71
落澄月,17783,23100,90
Kibou,16829,42765,83
머머머머머머머머,16792,1200,83
jjjjut,16550,2400,79
poniu,17730,2400,90
SingersSword,14453,1800,78`;


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

