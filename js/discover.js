window.addEventListener('load', function () {
    let allData;
    const parentDiv = document.querySelector(".right-datas");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("search");
    const HideSidebar = document.getElementById('hideSidebar');
    const showSidebarButton = document.getElementById('ShowSidebar');
    const showCtgButton = document.getElementById('show_ctgDiv');
    const All = document.getElementById("all");
    function renderData(data) {
        parentDiv.innerHTML = "";
        data.forEach((dataItem) => {
            const newchild = document.createElement("div");
            newchild.className = "DataContents"
            const innerHtml = `
                <a href="#" class="button">
                    <div class="element">
                        <div class="image"><img src="${dataItem.image}" alt="profile-image"></div>
                        <div class="contents">
                            <div class="head">
                                <span class="icon"><img src="${dataItem.head_icon}" alt="element-icon"></span>
                                <h3>${dataItem.heading}</h3>
                            </div>
                            <div class="info">
                                <p>${dataItem.info}</p>
                            </div>
                            <div class="subcribers">
                                <div class="online">${dataItem.online_count} online</div>
                                <span class="dot"></span>
                                <div class="members">${dataItem.members} members</div>
                            </div>
                            <div class="verified" style="${dataItem.Verify === 'not Verified' ? 'display: none;' : 'flex'}">
                                <span class="icon" ><img src="${dataItem.verified_icon}" alt="verified-icon"></span>
                                <span class="text">${dataItem.Verify}</span>
                            </div >
                        </div >
                    </div >
                </a >
                `;
            newchild.innerHTML = innerHtml;
            parentDiv.appendChild(newchild);
        });
    }

    fetch("../data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((responseData) => {
            allData = responseData;
            renderData(allData);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        })



    // Event listeners for sidebar

    function showSidebar() {
        const sidebar = document.querySelector('.menu');
        sidebar.style.display = 'flex'
    }

    showSidebarButton.addEventListener('click', showSidebar);

    // eventlisteners for hide sidebar

    function hideSidebar() {
        const sidebar = document.querySelector('.menu');
        sidebar.style.display = 'none';
    }

    HideSidebar.addEventListener('click', hideSidebar);

    // place holder changing function



    document.getElementById("all").addEventListener("click", function placeHolder() {
        const ctgAll = document.querySelector(".text_category");
        ctgAll.textContent = 'All';
    });




    // Show category  function

    function showCategory() {
        const category = document.querySelector('.left-categories');
        if (category.style.display === 'flex') {
            category.style.display = 'none';
        } else {
            category.style.display = 'flex';
        }
    }

    showCtgButton.addEventListener('click', showCategory);

    // category function 

    document.getElementById("all").addEventListener("click", function () {
        const ctgAll = document.querySelector(".text_category");
        ctgAll.textContent = 'All';
        renderData(allData);
    });

    document.getElementById("gaming").addEventListener("click", function () {
        const ctgAll = document.querySelector(".text_category");
        ctgAll.textContent = 'Gaming';
        const filteredData = allData.filter(function (dataItem) {
            return dataItem.category === "game";
        });
        renderData(filteredData);
    });

    document.getElementById("entertainment").addEventListener("click", function () {
        const ctgAll = document.querySelector(".text_category");
        ctgAll.textContent = 'Entertainment';
        const filteredData = allData.filter(function (dataItem) {
            return dataItem.category === "entertainment";
        });
        renderData(filteredData);
    });

    document.getElementById("education").addEventListener("click", function () {
        const ctgAll = document.querySelector(".text_category");
        ctgAll.textContent = 'Education';
        const filteredData = allData.filter(function (dataItem) {
            return dataItem.category === "education";
        });
        renderData(filteredData);
    });

    // search bar function 

    function handleSearch() {
        const query = searchInput.value.trim();
        const filteredData = allData.filter((dataItem) => {
            return dataItem.heading.toLowerCase().includes(query.toLowerCase()) ||
                dataItem.info.toLowerCase().includes(query.toLowerCase());
        });
        renderData(filteredData);
    }

    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter")
            handleSearch();
    })

});
