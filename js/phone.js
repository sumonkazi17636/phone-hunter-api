const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones)
    //console.log(data.data)
}

const displayPhones = phones => {
    //step-1 where to be push
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    const showAll = document.getElementById('show-all')
    if(phones.length>12){
        showAll.classList.remove('hidden')
    }
    else{
      showAll.classList.add('hidden')
    }
    phones = phones.slice(0,12)

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
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
        `;
        //step-4 appenChild
        phoneContainer.appendChild(phoneCard)



    });
    toggleLoadingSpinner(false);
    
};

const handleSearch = ()=>{
  toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText)
    loadPhone(searchText);
    
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



