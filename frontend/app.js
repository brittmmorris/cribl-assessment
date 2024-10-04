// API Gateway endpoint URL
const apiEndpoint = 'https://ikd9g067x9.execute-api.us-east-1.amazonaws.com/prod/files';
debugger

// Function to fetch data from API Gateway
async function fetchFileSystem() {
  debugger
  try {
    const response = await fetch(apiEndpoint);
    debugger
    if (!response.ok) {
          debugger
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fileSystem = await response.json();
        debugger
        initializeFileSystem(fileSystem);
    } catch (error) {
        console.error('Error fetching file system:', error);
    }
}

// Function to initialize the file system after fetching data
function initializeFileSystem(fileSystem) {
    // Initialize the left pane with the directory tree
    const directoryList = document.getElementById('directoryList');
    renderFolderTree(fileSystem, directoryList);

    // Initialize the right pane with the file/folder list for the root folder
    const fileTable = document.querySelector('#fileTable tbody');
    renderFileFolderList(fileSystem[0], fileTable);  // Start by rendering the root folder
}

// Render the left pane directory tree recursively going through each folder node
function renderFolderTree(node, parentElement, level = 0) {
    node.forEach(item => {
        if (item.type === 'folder') {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.id = item.name;  // Use folder name as the unique ID
            li.classList.add(item.type);
            parentElement.appendChild(li);
            li.style.cursor = 'pointer';

            if (item.children) {
                const ul = document.createElement('ul');
                li.appendChild(ul);

                if (level < 1) {
                    renderFolderTree(item.children, ul, level + 1);  // Recursively render subfolders
                }
            }

            // Handle click event for the folder in the left pane
            li.addEventListener('click', (event) => {
                event.stopPropagation();  // Prevents click event from bubbling up

                toggleRightPane(item, level);  // Syncs and toggles the right pane to reflect the folder
                toggleLeftPane(item, level);  // Expands or collapses the folder in the left pane
            });
        }
    });
}

// Render files and folders in the right pane, with the ability to expand/collapse folders
function renderFileFolderList(folderNode, fileTable, parentRow = null, level = 1) {
    folderNode.children.forEach(item => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const modifiedCell = document.createElement('td');
        const sizeCell = document.createElement('td');

        nameCell.textContent = item.name;  // Display folder/file name
        modifiedCell.textContent = new Date(item.modified).toLocaleDateString();  // Show modification date
        sizeCell.textContent = item.type === 'file' ? item.size : '--';  // Show size or placeholder

        if (item.type === 'folder') {
            nameCell.style.cursor = 'pointer';
            nameCell.addEventListener('click', () => {
                toggleLeftPane(item, level);  // Sync with left pane when right folder is clicked
                toggleRightPane(item, level);  // Expand/collapse the folder
            });
        }

        // Append the row to the table in the right pane
        row.appendChild(nameCell);
        row.appendChild(modifiedCell);
        row.appendChild(sizeCell);
        row.classList.add(item.type);
        row.setAttribute('type', item.type);  // Set a data attribute to track parent folder

        // Add child rows under the parent row
        if (parentRow) {
            row.setAttribute('data-parent', `${parentRow.getAttribute('data-parent')}-${folderNode.name}`);  // Set a data attribute to track parent folder
            row.classList.add('child');
            row.childNodes[0].style.paddingLeft = `${level * 20}px`; // Add padding based on nesting level
            parentRow.after(row);
        } else {
            fileTable.appendChild(row);
        }
    });
}

// Toggles the right pane folder expansion/collapse
function toggleRightPane(folderNode, level) {
    const folderItems = document.querySelectorAll('#fileTable tbody tr');  // Select all rows in right pane

    // Search for the folder in the right pane to toggle
    folderItems.forEach(item => {
        if (item.childNodes[0].innerText === folderNode.name) {
            // Toggle between expansion and collapse
            if (item.nextSibling && item.nextSibling.classList.contains('child')) {
                let next = item.nextSibling;

                // If the child items parent includes this folder name
                if (next.getAttribute('data-parent').includes(folderNode.name)) {
                    while (next && next.getAttribute('data-parent') && next.getAttribute('data-parent').includes(folderNode.name)) {
                        const toRemove = next;
                        next = next.nextSibling;
                        toRemove.remove();  // Collapse the folder by removing child rows
                    }
                } else {
                    renderFileFolderList(folderNode, document.querySelector('#fileTable tbody'), item, level + 1);  // Expand
                }
            } else {
                renderFileFolderList(folderNode, document.querySelector('#fileTable tbody'), item, level + 1);  // Expand
            }
        }
    });
}

// Toggles the left pane folder expansion/collapse
function toggleLeftPane(folderNode, level) {
    const selectedFolder = document.getElementById(folderNode.name);  // Get the folder element by its ID

    // Check if the folder is already expanded
    if (selectedFolder.nextElementSibling && selectedFolder.nextElementSibling.tagName === 'UL') {
        selectedFolder.nextElementSibling.remove();  // Collapse by removing the next UL element (child files)
    } else {
        const ul = document.createElement('ul');  // Create UL element for listing files
        folderNode.children.forEach(child => {
            const li = document.createElement('li');
            li.textContent = child.name;  // Add file names under the folder
            li.classList.add(child.type);

            if (child.type === 'folder') {
                li.id = child.name;
                li.addEventListener('click', (event) => {
                    event.stopPropagation();  // Prevents click event from bubbling up

                    toggleRightPane(child, level);  // Syncs and toggles the right pane to reflect the folder
                    toggleLeftPane(child, level);  // Expands or collapses the folder in the left pane
                });
            }
            ul.appendChild(li);
        });
        selectedFolder.after(ul);  // Add the UL element after the clicked folder
    }
}

// Fetch the file system and initialize the UI
fetchFileSystem();
