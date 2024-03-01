const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones,isShowAll)
    //console.log(data.data)
}

const displayPhones = (phones,isShowAll) => {
    //step-1 where to be push
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    const showAll = document.getElementById('show-all')
    if(phones.length>12 && !isShowAll){
        showAll.classList.remove('hidden')
    }
    else{
      showAll.classList.add('hidden')
    }
    if(!isShowAll){
      phones = phones.slice(0,12)
    }

    phones.forEach(phone => {
        console.log(phone)
        //step-2 create a div
        const phoneCard = document.createElement('div')
        //step-3 innerHtml set
        phoneCard.innerHTML = `
        <div class="card bg-gray-100 p-4 shadow-xl">
                    <figure><img src="${phone.image}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                  </div>
        `;
        //step-4 appenChild
        phoneContainer.appendChild(phoneCard)



    });
    toggleLoadingSpinner(false);
    
};

const handleSearch = (isShowAll)=>{
  toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText)
    loadPhone(searchText,isShowAll);
    
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = ()=>{
    handleSearch(true);
}


const handleShowDetails = async (id) => {
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        const data = await res.json();
        const phone = data.data;
        showDetailsModal(phone)
}

const showDetailsModal = (phone) =>{
  console.log(phone)
  const phoneName = document.getElementById('show-details-phone-name')
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <img src = "${phone.image}" alt =""/>
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
  <p><span>Slug:</span>${phone?.slug}</p>
  <p><span>Realease Date:</span>${phone?.mainFeatures?.releaseDate}</p>
  <p><span>Brand:</span>${phone?.brand}</p>
  <p><span>GPS:</span>${phone?.others?.GPS}</p>
  `
  show_details_modal.showModal();
}
