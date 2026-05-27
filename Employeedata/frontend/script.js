let employees = [];
let currentId = null;

/* LOAD EMPLOYEES */
function loadEmployees(){

    fetch("http://localhost:9090/employees")

    .then(res => res.json())

    .then(data => {

        employees = data;

        renderEmployees(data);

        updateDashboard(data);

    });

}

/* RENDER TABLE */
function renderEmployees(data){

    const tableBody =
    document.getElementById("tableBody");

    tableBody.innerHTML = "";

    data.forEach(emp => {

        tableBody.innerHTML += `

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>

                <div class="actions">

                    <button
                    class="edit-btn"
                    onclick='showDetails(${JSON.stringify(emp)})'>
                    Edit
                    </button>

                    <button
                    class="delete-btn"
                    onclick='deleteEmployee("${emp.id}")'>
                    Delete
                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

/* ADD EMPLOYEE */
function addEmployee(){

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const dept =
    document.getElementById("dept").value.trim();

    if(name === "" || email === "" || dept === ""){

        alert("Please fill all fields");
        return;
    }

    const exists = employees.some(emp =>

        emp.email.toLowerCase() === email.toLowerCase()

    );

    if(exists){

        alert("Employee already exists");
        return;
    }

    fetch("http://localhost:9090/employees",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:name,
            email:email,
            department:dept

        })

    })

    .then(() => {

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("dept").value = "";

        loadEmployees();

        alert("Employee Added");

    });

}

/* DELETE */
function deleteEmployee(id){

    if(confirm("Delete Employee?")){

        fetch(`http://localhost:9090/employees/${id}`,{

            method:"DELETE"

        })

        .then(() => {

            loadEmployees();

        });

    }

}

/* EDIT */
function showDetails(emp){

    currentId = emp.id;

    document.getElementById("editName").value =
    emp.name;

    document.getElementById("editEmail").value =
    emp.email;

    document.getElementById("editDept").value =
    emp.department;

    document.getElementById("popup").style.display =
    "flex";

}

/* CLOSE */
function closePopup(){

    document.getElementById("popup").style.display =
    "none";

}

/* UPDATE */
function updateEmployee(){

    const updatedEmployee = {

        name:document.getElementById("editName").value,

        email:document.getElementById("editEmail").value,

        department:document.getElementById("editDept").value

    };

    fetch(`http://localhost:9090/employees/${currentId}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(updatedEmployee)

    })

    .then(() => {

        closePopup();

        loadEmployees();

        alert("Employee Updated");

    });

}

/* SEARCH */
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

/* DASHBOARD */
function updateDashboard(data){

    document.getElementById("totalEmployees")
    .innerText = data.length;

    const departments = [

        ...new Set(data.map(emp => emp.department))

    ];

    document.getElementById("departmentCount")
    .innerText = departments.length;

}

/* THEME */
function toggleTheme(){

    document.body.classList.toggle("light-mode");

}

/* SIDEBAR ACTIVE */
function removeActive(){

    document
    .querySelectorAll(".menu li")
    .forEach(item => {

        item.classList.remove("active");

    });

}

/* SHOW EMPLOYEE PAGE */
function showEmployees(element){

    removeActive();

    element.classList.add("active");

    document.getElementById("dashboardSection")
    .style.display = "none";

    document.getElementById("employeeSection")
    .style.display = "block";

}

/* SHOW DASHBOARD */
function showDashboard(element){

    removeActive();

    element.classList.add("active");

    document.getElementById("dashboardSection")
    .style.display = "block";

    document.getElementById("employeeSection")
    .style.display = "none";

}

/* INITIAL LOAD */
loadEmployees();