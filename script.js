const apiUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
let students = [];
let filteredStudents = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            students = data;
            filteredStudents = students;
            displayTable(filteredStudents);
        });
});

function displayTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${student.img_src}" alt="Student Image"> ${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    filteredStudents = students.filter(student => {
        return (
            student.first_name.toLowerCase().includes(query) ||
            student.last_name.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    });
    displayTable(filteredStudents);
}

function sortTable(criteria) {
    switch(criteria) {
        case 'nameAsc':
            filteredStudents.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
            break;
        case 'nameDesc':
            filteredStudents.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
            break;
        case 'marks':
            filteredStudents.sort((a, b) => a.marks - b.marks);
            break;
        case 'passing':
            filteredStudents = students.filter(student => student.passing);
            break;
        case 'class':
            filteredStudents.sort((a, b) => a.class - b.class);
            break;
        case 'gender':
            const maleStudents = filteredStudents.filter(student => student.gender === 'Male');
            const femaleStudents = filteredStudents.filter(student => student.gender === 'Female');
            displayTable(maleStudents);
            displayTable(femaleStudents);
            return;
        default:
            return;
    }
    displayTable(filteredStudents);
}
