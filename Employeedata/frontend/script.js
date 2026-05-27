let employees = [];
let currentId = null;

const API_URL = "http://localhost:9090/employees";


// LOAD EMPLOYEES
function loadEmployees() {

    fetch(API_URL)

    .then(response => response.json())

    .then(data => {

        employees = data;

        renderEmployees(data);

        updateDashboard(data);

    })

    .catch(error => {

        console.log(error);

    });

}


// RENDER EMPLOYEES
function renderEmployees(data) {

    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    data.forEach(emp => {

        tableBody.innerHTML += `

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>

                <button
                class="edit-btn"
                onclick="showDetails('${emp.id}')">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteEmployee('${emp.id}')">
                Delete
                </button>

            </td>

        </tr>

        `;

    });

}


// ADD EMPLOYEE
function addEmployee() {

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const dept = document.getElementById("dept").value.trim();


    // EMPTY VALIDATION
    if(name === "" || email === "" || dept === ""){

        alert("Please fill all fields");

        return;
    }


    // EMAIL VALIDATION
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){

        alert("Invalid Email");

        return;
    }


    // DUPLICATE CHECK
    const duplicate = employees.some(emp =>

        emp.name.toLowerCase() === name.toLowerCase()

        ||

        emp.email.toLowerCase() === email.toLowerCase()

    );

    if(duplicate){

        alert("Employee already exists");

        return;
    }


    // SAVE
    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,

            email: email,

            department: dept

        })

    })

    .then(response => response.json())

    .then(() => {

        alert("Employee Added");

        document.getElementById("name").value = "";

        document.getElementById("email").value = "";

        document.getElementById("dept").value = "";

        loadEmployees();

    })

    .catch(error => {

        console.log(error);

    });

}


// DELETE EMPLOYEE
function deleteEmployee(id){

    const confirmDelete = confirm("Delete Employee?");

    if(confirmDelete){

        fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        })

        .then(() => {

            loadEmployees();

        });

    }

}


// SEARCH
function searchEmployee(){

    const keyword =

    document.getElementById("searchInput")
    .value
    .toLowerCase();

    const filtered = employees.filter(emp =>

        emp.name.toLowerCase().includes(keyword)

        ||

        emp.department.toLowerCase().includes(keyword)

    );

    renderEmployees(filtered);

}


// UPDATE DASHBOARD
function updateDashboard(data){

    document.getElementById("totalEmployees")
    .innerText = data.length;

    const departments =

    [...new Set(data.map(emp => emp.department))];

    document.getElementById("departmentCount")
    .innerText = departments.length;

}


// THEME TOGGLE
function toggleTheme(){

    document.body.classList.toggle("light-mode");

}


// SHOW DETAILS
function showDetails(id){

    const emp = employees.find(e => e.id === id);

    currentId = id;

    document.getElementById("editName").value = emp.name;

    document.getElementById("editEmail").value = emp.email;

    document.getElementById("editDept").value = emp.department;

    document.getElementById("popup").style.display = "flex";

}


// CLOSE POPUP
function closePopup(){

    document.getElementById("popup").style.display = "none";

}


// UPDATE EMPLOYEE
function updateEmployee(){

    fetch(`${API_URL}/${currentId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: document.getElementById("editName").value,

            email: document.getElementById("editEmail").value,

            department: document.getElementById("editDept").value

        })

    })

    .then(() => {

        closePopup();

        loadEmployees();

    });

}


// INITIAL LOAD
loadEmployees();