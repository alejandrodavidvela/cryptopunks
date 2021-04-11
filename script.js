const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const chubbiesEl = document.getElementById('chubbies');
const resultHeading = document.getElementById('result-heading');
const single_chubbyEl = document.getElementById('single-chubby');
const get_age = document.getElementById('get-age');


function searchChubby(e){
    e.preventDefault();

    // Clear Single Chubby
    single_chubbyEl.innerHTML = '';

    // Get Search Term
    const term = search.value;

    
    
    //Check for Empty
    if(term < 0 || term > 9999){
        alert('Please enter a number between 0 - 9999');
        search.value = '';
    }else{
        if(term.trim()){
            fetch(`https://api.opensea.io/api/v1/assets/?asset_contract_address=0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb&token_ids=${term}`)
                .then(res => res.json())
                .then(data => {
                    
                    if(data.assets === null){
                        resultHeading.innerHTML = `<p>There are no search results. Try Again!</p>`;
    
                    }else{
                        
                        const year = data.assets;
                        const currentYear = year[0].asset_contract.created_date.slice(0,4)
                        

                        
                        function updateCountdown() {
                            const currentTime = new Date().getUTCFullYear()
                            
                            const diff = currentTime - currentYear;
                            
                            return diff
                        }    
                        const diff = updateCountdown()
                        
                        

                        chubbiesEl.innerHTML = data.assets.map(asset => `
                            <div class="chubby">
                                <img src="${asset.image_url}" alt="${asset.name}" />
                                <div class="chubby-info" data-chubbyID="${asset.id}">
                                    <h3>${asset.name}</h3>
                                </div>
                                <div class="chubby-birthday">
                                    <h3>Age:</h3>
                                    <h4 class="chubby-birthday-date">${diff} Yrs Old</h4>
                                </div>
                                <div class="chubby-owner">
                                    <h3>Owner:</h3>
                                    <a class="chubby-address" href="https://etherscan.io/address/${asset.owner.address}">${asset.owner.address}</a>
                                </div>
                                <div class="chubby-traits">
                                    <h3>Bid on NFT:</h3>
                                    <a class="chubby-traits-link" href="https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/${term}">OpenSea</a>     
                                </div>
                                <div class="chubby-namebase">
                                    <h3>Bid on TLD:</h3>
                                    <a class="chubby-namebase-link" href="https://www.namebase.io/domains/phb">Namebase</a>     
                                </div>
                                
    
                            </div>
                        `).join('');
                    }
                    // Clear Search Text
                    search.value = '';
                });
        }else{
            alert('Please enter a CryptoPunk Number')
        }
    }
    
}



// Event Listener
submit.addEventListener('submit', searchChubby);
