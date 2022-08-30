const loadPhone = async(searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit);
} /* step-2 */

const displayPhones = (phones, datalimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = ''; 

    // Display 10 phones only
    const showAll = document.getElementById('show-all');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    // phones = phones.slice(0, 10); /* step-3 */

    // Display No phone found. Please try again.
    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    } /* step-4 */

    // Display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv)
    }); /* step-5 */
    // Stop spinner or loader
    toggleSpinner(false);
}

// Search button. line 60 and 89
const processSearch = (datalimit) => {
    toggleSpinner(true);

    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText, datalimit)
}
// Handle search button click       /* step-1 */
document.getElementById('btn-search').addEventListener('click', function(){
    // Start loader
    /* toggleSpinner(true);

    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText) */
    processSearch(10)
})

// Search input field Enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
        // code for Enter
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    } /* step-6 */
}

// Not the best way to load show all button
document.getElementById('btn-show-all').addEventListener('click', function(){
    /* toggleSpinner(true);

    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText) */
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel')
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-detail')
    const createImg = document.createElement('div') /* extra */
    phoneDetails.innerHTML = `
        <p>Release date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No Sensor'}</p>
        <img class="p-1" src="${phone.image ? phone.image : 'No Image Found'}" class="card-img-top" alt="...">
    ` /* img extra */
    phoneDetails.appendChild(createImg); /* extra */
}
loadPhone('apple');