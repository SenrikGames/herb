document.addEventListener('DOMContentLoaded', () => {
  // Sample CSV data
  const csvData = `Herb,Level,Guild Contribution,Guild Conquest
Anhjew,13079,22046,53
Bigmuff,12930,54913,54
Bobertson,10824,23790,35
Bryanth,12828,16952,51
Deeny,12987,36730,53
Halosito,12304,9238,44
Imhim,10661,22563,0
Kaza,12190,30308,46
Mikmik,13224,41261,58
MoldyMeat,12745,48436,49
PiroTree,12912,41323,55
Qqrage,12723,16947,51
Ressurrectionx3,12972,16683,51
Rosumi,12945,17524,56
Satoshi,12831,34848,0
Senrik,13707,76730,77
Tankcat,12668,17150,52
TonTon,12616,27551,50
Waifuwu,13300,33175,55
cupkayc,13077,33612,35
hijklmno,12707,30762,50
orbitGor,13039,21150,50
z4rt,12982,41454,54
오유스,13036,26205,55
G37,8190,0,0`;

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

