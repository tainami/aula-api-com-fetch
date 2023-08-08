const url = "http://localhost:5500/api"

function getUsers() {
    fetch(url) // retornar a url para dentro do then
    .then(response => response.json())
    .then(data => data.users)
    .then(users => {
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            const userDiv = document.createElement("div")
            const userId = document.createElement("p")
            const userName = document.createElement("p")
            const userCity = document.createElement("p")
            const userAvatar = document.createElement("img")
            const userButton = document.createElement("button")

            userId.textContent = `ID: ${user.id}`
            userName.textContent = `Name: ${user.name}`
            userCity.textContent = `City: ${user.city}`
            userButton.textContent = "Remove"
            userButton.onclick = () => {removeUser(user.id)}
            userAvatar.src = user.avatar

            userDiv.append(userAvatar)
            userDiv.append(userId)
            userDiv.append(userName)
            userDiv.append(userCity)
            userDiv.append(userButton)
            userDiv.classList.add("user")
            renderUsers.append(userDiv)
        }
    })
    .catch(error => console.error(error)) 
}

// get com parametros
function getUser() {
    fetch(`${url}/13`)
    .then(response => response.json())
    .catch(error => console.error(error))
}

// post
function addUser(newUser) {
    fetch(url, {
        method: "POST", 
        body: JSON.stringify(newUser),
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }   
    })
    .then(response => response.json())
    .then(data => alertApi.textContent =  console.log(`API response: ${data}`))
    .catch(error => console.error(error))
}

// delete 
function removeUser(id) {
    fetch(`${url}/${id}`, {
        method: "DELETE"  
    })
    .then(renderUsers.replaceChildren())
    .then(() => getUsers())
    .catch(error => console.error(error))
}

const newUser = {
    name: "Maria José",
    avatar: "https://picsum.photos/200/300",
    city: "Porto Alegre",
}

addUser(newUser)
getUsers()
getUser()
