const loadPhone = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = '';

    // Display 10 phones only
    phones = phones.slice(0, 10);

    // Display No phone found. Please try again.
    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }

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
    });
}

document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText)
})

// loadPhone();