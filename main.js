let form = document.querySelector(".form");
let tbody = document.querySelector("tbody");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3001/users", {  // Portni bir xil qilish
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    }),
  }).then(() => {
    window.location.reload(); // Ma'lumot qo'shilganda sahifani yangilash
  }).catch((err) => console.error("Xatolik:", err));
});

(async function () {
  let response = await fetch("http://localhost:3001/users");
  let users = await response.json();

  users.forEach((user) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    // Tugmalarni sozlash
    delBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    delBtn.classList.add("del-btn")
    editBtn.classList.add("edit-btn")


    // Jadvalga ma'lumotlarni joylashtirish
    td1.textContent = user.name;
    td2.textContent = user.email;
    td3.textContent = "***"; // Parolni ko'rsatmaslik

    tr.append(td1, td2, td3, td4);
    td4.classList.add("td-btn")
    td4.append(delBtn, editBtn);
    tbody.append(tr);

    // Delete tugmasi
    delBtn.addEventListener("click", () => {
      fetch(`http://localhost:3001/users/${user.id}`, {
        method: "DELETE",
      }).then(() => {
        tr.remove(); // Jadval qatorini o'chirish
      }).catch((err) => console.error("Error:", err));
    });

    // Edit tugmasi
    editBtn.addEventListener("click", () => {
      let name = prompt("Name:", user.name) || user.name;
      let email = prompt("Email:", user.email) || user.email;
      let password = prompt("Password:", "*****") || user.password;  // Parolni ko'rsatmaslik

      fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }).then(() => {
        td1.textContent = name;
        td2.textContent = email;
        td3.textContent = "***"; // Parolni ko'rsatmaslik
      }).catch((err) => console.error("Error:", err));
    });
  });
})();
