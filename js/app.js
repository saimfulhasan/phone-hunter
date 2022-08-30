const loadPhone = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
} /* step-2 */

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = ''; 

    // Display 10 phones only
    const showAll = document.getElementById('show-all');
    if(phones.length > 10){
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
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv)
    }); /* step-5 */
    // Stop spinner or loader
    toggleSpinner(false);
}

// Handle search button click       /* step-1 */
document.getElementById('btn-search').addEventListener('click', function(){
    // Start loader
    toggleSpinner(true);

    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText)
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    } /* step-6 */
}
// loadPhone();