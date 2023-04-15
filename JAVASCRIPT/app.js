const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchItem = document.querySelector("#search");
const getUser = async (username)=>{
    const responce = await fetch(APIURL + username);
    const data = await responce.json();
    // console.log(data);
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src=${data.avatar_url} alt="IMG">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p><strong>Bio:</strong> ${data.bio}</p>
                    <ul class="info">
                        <li><strong>${data.followers} Followers</strong></li>
                        <li><strong>${data.following} Following</strong></li>
                        <li><strong>${data.public_repos} Repos</strong></li>
                    </ul>
                    <div id="repos">
                        
                    </div>
            </div>
        </div>
    `
    main.innerHTML = card;
    getRepos(username);
}

// Initial Call
getUser("JaviyaShivam");

// Function for repos
const getRepos = async (username) =>{
    const repos = document.querySelector("#repos");
    const responce = await fetch(APIURL + username + "/repos");
    const data = await responce.json();
    data.forEach
        (item => {
            const element = document.createElement("a");
            element.classList.add("repo");
            element.href = item.html_url;
            element.innerText = item.name;
            element.target = "_blank";
            repos.appendChild(element);
        }
    );
}

// On Submition of form
const formSubmit = () =>{
    if(searchItem != ""){
        getUser(searchItem.value);
        searchItem.value = "";
    }
    return false;
}

searchItem.addEventListener(
    "focusout",
    function(){
        formSubmit();
    }
)