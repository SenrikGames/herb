document.addEventListener('DOMContentLoaded', () => {
  // Sample CSV data
const csvData = `Herb,Level,Contribution,Conquest
Senrik,20306,224248,100
Anhjew,16500,138843,84
Qqrage,16687,129141,79
MikMik,16469,115705,86
Jackboy,16531,55704,83
Resurrectionx3,16701,128909,85
Rosumi,16352,98549,80
orbitGor,16362,129748,77
grasspack,15751,42448,71
PiroTree,15993,116062,78
Locats,15830,38784,73
Tankcat,15651,122220,79
Lystrosaurus,16131,66924,72
Deeny,15845,144311,79
Bryanth,14674,78494,62
Kaza,13992,88303,56
TonTon,14983,86710,64
Waifuwu,15511,124049,73
Haenul,13958,900,55
Fugitive,16252,3000,85
Kyute,14166,1500,56
Bolofski,14920,2400,58
落澄月,17396,0,0
Kibou,16020,1500,80
머머머머머머머머,16430,0,0`;
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

