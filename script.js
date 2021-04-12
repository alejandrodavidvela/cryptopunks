const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const cryptopunksEl = document.getElementById('cryptopunks');
const resultHeading = document.getElementById('result-heading');
const single_cryptopunkEl = document.getElementById('single-cryptopunk');
const get_age = document.getElementById('get-age');


function searchCryptopunk(e){
    e.preventDefault();

    // Clear Single cryptopunk
    single_cryptopunkEl.innerHTML = '';

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
                        
                        

                        cryptopunksEl.innerHTML = data.assets.map(asset => `
                            <div class="cryptopunk">
                                <img class="cryptopunk-img" src="${asset.image_url}" alt="${asset.name}" />
                                <div class="cryptopunk-info" data-cryptopunkID="${asset.id}">
                                    <h3>${asset.name}</h3>
                                </div>
                                <div class="cryptopunk-birthday">
                                    <h3>Age:</h3>
                                    <h4 class="cryptopunk-birthday-date">${diff} Yrs</h4>
                                </div>
                                <div class="cryptopunk-owner">
                                    <h3>Owner:</h3>
                                    <a class="cryptopunk-address" href="https://etherscan.io/address/${asset.owner.address}">${asset.owner.address}</a>
                                </div>
                                <div class="cryptopunk-traits">
                                    <h3>Bid on NFT:</h3>
                                    <a class="cryptopunk-traits-link" href="https://opensea.io/assets/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/${term}">OpenSea</a>     
                                </div>
                                <div class="cryptopunk-namebase">
                                    <h3>Bid on .phb/</h3>
                                    <a class="cryptopunk-namebase-link" href="https://www.namebase.io/domains/phb">Namebase</a>     
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
submit.addEventListener('submit', searchCryptopunk);
