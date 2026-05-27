function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

// LOAD EMPLOYEES
function loadEmployees() {

    showLoader();

    fetch("http://localhost:9090/employees")
        .then(res => res.json())
        .then(data => {

            let list = document.getElementById("list");

            list.innerHTML = "";

            data.forEach(emp => {

                let li = document.createElement("li");

                li.innerHTML = `
                    <span>
                        ${emp.name} - ${emp.department}
                    </span>

                    <div>
                        <button onclick='showDetails(${JSON.stringify(emp)})'>
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="askDelete('${emp.id}')">
                            Delete
                        </button>
                    </div>
                `;

                list.appendChild(li);

            });

            hideLoader();

        })
        .catch(error => {
            console.log(error);
            hideLoader();
        });
}

function addEmployee() {

    showLoader();

    // GET VALUES
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const dept = document.getElementById("dept").value.trim();

    // EMPTY FIELD VALIDATION
    if (name === "" || email === "" || dept === "") {

        alert("Please fill all fields!");

        hideLoader();

        return;
    }

    // EMAIL VALIDATION
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {

        alert("Please enter valid email!");

        hideLoader();

        return;
    }

    // CHECK DUPLICATE EMPLOYEE
    fetch("http://localhost:9090/employees")

        .then(res => res.json())

        .then(data => {

            const exists = data.some(emp =>

                emp.name.toLowerCase() === name.toLowerCase()

                ||

                emp.email.toLowerCase() === email.toLowerCase()

            );

            // DUPLICATE FOUND
            if (exists) {

                alert("Employee already exists!");

                hideLoader();

                return;
            }

            // SAVE EMPLOYEE
            fetch("http://localhost:9090/employees", {

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

            .then(res => res.json())

            .then(() => {

                // SUCCESS MESSAGE
                alert("Employee added successfully!");

                // AUTO CLEAR FORM
                document.getElementById("name").value = "";

                document.getElementById("email").value = "";

                document.getElementById("dept").value = "";

                // RELOAD LIST
                loadEmployees();

                hideLoader();

            })

            .catch(error => {

                console.log(error);

                alert("Something went wrong!");

                hideLoader();

            });

        })

        .catch(error => {

            console.log(error);

            alert("Server Error!");

            hideLoader();

        });

}

// EDIT POPUP
let currentId = null;

function showDetails(emp) {

    currentId = emp.id;

    document.getElementById("editName").value = emp.name;

    document.getElementById("editEmail").value = emp.email;

    document.getElementById("editDept").value = emp.department;

    document.getElementById("popup").style.display = "flex";
}

// CLOSE POPUP
function closePopup() {

    document.getElementById("popup").style.display = "none";
}

// UPDATE EMPLOYEE
function updateEmployee() {

    fetch(`http://localhost:9090/employees/${currentId}`, {

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

// DELETE LOGIC
let deleteId = null;

function askDelete(id) {

    deleteId = id;

    document.getElementById("confirmBox").style.display = "flex";
}

function confirmDelete() {

    fetch(`http://localhost:9090/employees/${deleteId}`, {

        method: "DELETE"

    })
    .then(() => {

        closeConfirm();

        loadEmployees();

    });

}

function closeConfirm() {

    document.getElementById("confirmBox").style.display = "none";
}

// INITIAL LOAD
loadEmployees();