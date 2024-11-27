let form = document.querySelector(".form");
let tbody = document.querySelector("tbody");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    }),
  })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => console.error("Xatolik:", err));
});

(async function () {
  let response = await fetch("http://localhost:3000/users");
  let users = await response.json();

  users.forEach((user) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    delBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    delBtn.classList.add("del-btn");
    editBtn.classList.add("edit-btn");

    td1.textContent = user.name;
    td2.textContent = user.email;
    td3.textContent = "Password: " + user.password;

    tr.append(td1, td2, td3, td4);
    td4.classList.add("td-btn");
    td4.append(delBtn, editBtn);
    tbody.prepend(tr);

    delBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
      })
        .then(() => {
          tr.remove();
        })
        .catch((err) => console.error("Error:", err));
    });

    editBtn.addEventListener("click", () => {
      let name = prompt("Name:", user.name) || user.name;
      let email = prompt("Email:", user.email) || user.email;
      let password = prompt("Password:", "*****") || user.password;

      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then(() => {
          td1.textContent = name;
          td2.textContent = email;
          td3.textContent = "***";
        })
        .catch((err) => console.error("Error:", err));
    });
  });
})();
