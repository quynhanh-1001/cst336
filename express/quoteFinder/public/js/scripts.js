

let authorLinks = document.querySelectorAll("a");

for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo() {

    let myModal = new bootstrap.Modal(
        document.getElementById("authorModal")
    );

    myModal.show();

    let url = `/api/author/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();

    let authorInfo = document.querySelector("#authorInfo");

    authorInfo.innerHTML = `
        <h1>${data[0].firstName} ${data[0].lastName}</h1>

        <img src="${data[0].portrait}" width="200" alt="Author portrait"><br>

        <p>Date of Birth: ${data[0].dob}</p>
        <p>Date of Death: ${data[0].dod}</p>
        <p>Sex: ${data[0].sex}</p>
        <p>Profession: ${data[0].profession}</p>
        <p>Country: ${data[0].country}</p>
        <p>Biography: ${data[0].biography}</p>
    `;
}