let tbody = document.getElementById("tbody");

// Import JSON
(async function loadDefaultData() {
  let response = await fetch("student.json");
  let students = await response.json();
  loadDatatoTable(students);
})();

async function loadDefaultData() {
  let response = await fetch("student.json");
  let students = await response.json();
  return students;
}

// Loading the content of JSON in out HTML
function loadDatatoTable(students) {
  tablem.style.display = "none";
  students.forEach((item) => {
    let tr = document.createElement("tr");
    let fullname = `${item.first_name} ${item.last_name}`;
    let passing = item.passing ? "Passed" : "Failed";
    tr.innerHTML = `<td>${item.id}</td>
                         <td><div class="imgc"><img style="border:1px solid #000; vertical-align:middle; border-radius:50%;" src="${item.img_src}">
                              ${fullname}</div>
                         </td>
                         <td>${item.gender}</td>
                         <td>${item.class}</td>
                         <td>${item.marks}</td>
                         <td>${passing}</td>
                         <td>${item.email}</td>`;
    tbody.appendChild(tr);
  });
}

// Searching
let searchstring = document.getElementById("searchstring");

async function filterData() {
  let data = await loadDefaultData();
  tbody.innerHTML = "";
  let resultstudents = data.filter((item) => {
    let valuestr = searchstring.value.toLowerCase();
    let value = valuestr.trim();
    if (
      value === `${item.last_name}`.toLowerCase() ||
      value === `${item.first_name}`.toLowerCase() ||
      value === `${item.email}`.toLowerCase()
    ) {
      return true;
    }
  });
  loadDatatoTable(resultstudents);
}

// Sort A->Z
async function sortazf() {
  let students = await loadDefaultData();
  tbody.innerHTML = "";
  students.forEach(function (student) {
    student.fullName = student.first_name + " " + student.last_name;
  });

  students.sort(function (a, b) {
    if (a.fullName < b.fullName) {
      return -1;
    } else if (a.fullName > b.fullName) {
      return 1;
    } else {
      return 0;
    }
  });
  loadDatatoTable(students);
}

// Sort Z->A
async function sortza() {
  let students = await loadDefaultData();
  tbody.innerHTML = "";
  students.forEach(function (student) {
    student.fullName = student.first_name + " " + student.last_name;
  });

  students.sort(function (a, b) {
    if (a.fullName > b.fullName) {
      return -1;
    } else if (a.fullName < b.fullName) {
      return 1;
    } else {
      return 0;
    }
  });
  loadDatatoTable(students);
}

// Sort by marks
async function sortbymarks() {
  let students = await loadDefaultData();
  tbody.innerHTML = "";
  students.sort((a, b) => {
    return a.marks - b.marks;
  });
  loadDatatoTable(students);
}

// Sort by class
async function sortbyclass() {
  let students = await loadDefaultData();
  tbody.innerHTML = "";
  students.sort((a, b) => {
    return a.class - b.class;
  });
  loadDatatoTable(students);
}

// Sort by passing
async function sortbypassing() {
  let students = await loadDefaultData();
  tbody.innerHTML = "";
  let resultstudents = students.filter((item) => {
    if (item.passing) return true;
  });
  loadDatatoTable(resultstudents);
}

// Sort by gender
let tbodymale = document.getElementById("tbodymale");
let tablem = document.getElementById("tablem");

async function sortbygender() {
  let students = await loadDefaultData();
  tbody.innerHTML = "";
  let female = students.filter((item) => {
    if (item.gender === "Female") return true;
  });
  loadDatatoTable(female);

  let male = students.filter((item) => {
    if (item.gender === "Male") return true;
  });

  tablem.style.display = "table";

  tbodymale.innerHTML = "";
  male.forEach((item) => {
    let tr = document.createElement("tr");
    let fullname = `${item.first_name} ${item.last_name}`;
    let passing = item.passing ? "Passed" : "Failed";
    tr.innerHTML = `<td>${item.id}</td>
                         <td><div class="imgc"><img style="border:1px solid #000; vertical-align:middle; border-radius:50%;" src="${item.img_src}">
                              ${fullname}</div>
                         </td>
                         <td>${item.gender}</td>
                         <td>${item.class}</td>
                         <td>${item.marks}</td>
                         <td>${passing}</td>
                         <td>${item.email}</td>`;
    tbodymale.appendChild(tr);
  });
}
