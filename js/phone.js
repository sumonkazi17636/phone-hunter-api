const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json()
    const phones = data.data
    displayPhones(phones)
    //console.log(data.data)
}

const displayPhones = phones => {
    //step-1 where to be push
    const phoneContainer = document.getElementById('phone-container')
    phones.forEach(phone => {
        console.log(phone)
        //step-2 create a div
        const phoneCard = document.createElement('div')
        //step-3 innerHtml set
        phoneCard.innerHTML = `
        <div class="card w-96 bg-gray-100 shadow-xl">
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
}

loadPhone();