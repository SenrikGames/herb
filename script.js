document.addEventListener('DOMContentLoaded', () => {
  // Sample CSV data
  const csvData = `Herb,Level,Guild Contribution,Guild Conquest
  
Senrik,13804,114733,85
Bigmuff,13021,81504,58
Lystrosaurus,13006,0,0
NyxNyx,13677,0,0
PiroTree,13110,61780,62
Deeny,13193,65738,60
Jackboy,12793,2400,54
hijklmno,12968,50160,56
Resurrectionx3,13300,45983,61
Qqrage,13117,46107,60
Bryanth,13014,37550,55
Mikmik,13423,64777,66
Imhim,12022,32295,43
Rosumi,13119,39359,64
z4rt,13128,61098,0
luihsuan,13331,13091,76
오유스,13170,46186,59
Halosito,13149,28659,53
Waifuwu,13368,51659,60
Anhjew,13339,52140,66
Tankcat,12970,43722,58
Kaza,12449,45841,48
TonTon,12965,44584,56
orbitGor,13288,50434,59
Satoshi,12898,41824,0`;


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

