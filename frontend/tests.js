
// Function to run tests
function runTests() {
    const testResults = document.getElementById('testResults');

    // Test 1: Check if the folder tree renders
    function testFolderTreeRender() {
        const directoryList = document.getElementById('directoryList');
        if (directoryList && directoryList.children.length > 0) {
            return { success: true, message: 'Folder tree renders correctly.' };
        } else {
            return { success: false, message: 'Folder tree does not render correctly.' };
        }
    }

    // Test 2: Check if a folder can expand
    function testFolderExpand() {
        const folder = document.getElementById('Documents');

        if (!folder) {
            return { success: false, message: "'Documents' folder not found in the DOM." };
        }

        folder.click();

        if (folder.nextElementSibling && folder.nextElementSibling.tagName === 'UL') {
            return { success: true, message: 'Folder expands correctly.' };
        } else {
            return { success: false, message: 'Folder does not expand correctly.' };
        }
    }


    // Test 3: Check if files display correctly in the right pane
    function testFileDisplay() {
        const fileTable = document.getElementById('fileTable').querySelector('tbody');
        if (fileTable && fileTable.children.length > 0) {
            return { success: true, message: 'Files display correctly in the right pane.' };
        } else {
            return { success: false, message: 'Files do not display correctly in the right pane.' };
        }
    }

    // Collect all tests
    const tests = [testFolderTreeRender, testFolderExpand, testFileDisplay];

    // Run all tests and display results
    tests.forEach(test => {
        const result = test();
        const li = document.createElement('li');
        li.textContent = result.message;
        li.style.color = result.success ? 'green' : 'red';
        testResults.appendChild(li);
    });
}

// Run tests on load
window.onload = runTests;
