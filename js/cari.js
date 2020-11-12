let searchInput = document.querySelector('#searchInput'),
    searchResult = document.querySelector('#searchResult');

let dataJSON;


// tombol 'backspace' di tekan pencarian dihentikan
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 8)
    {
        searchInput.value = '';
        searchResult.innerHTML = '';
        searchInput.blur()
    }
})
// mendapatkan daftar catatan kedalam format json
const getPostsJSON = async () => {
    let response = await fetch('/index.json')
    let data = await response.json()
    return data
}
// tampil hasil
const filterPostsJSON = (query, element) => {
    let result, itemsWithElement;
    query = new RegExp(query, 'ig')
    result = dataJSON.filter(item => query.test(item.title))
    itemsWithElement = result.map(item => (
        `<li class="search-result-item col-12 d-flex width-full py-2 border-bottom">
            <h4><a href="${item.url}">
                ${item.title}
            </a></h4>
        </li>`
    ))
    element.style.display = 'block';
    itemsWithElement.unshift
    element.innerHTML = itemsWithElement.join('');
}


const searchInputAction = (event, callback) => {
    searchInput.addEventListener(event, callback)
}

searchInputAction('focus', () => getPostsJSON().then(data => dataJSON = data))

// filter hasil pencarian
searchInputAction('keyup', (event) => filterPostsJSON(event.target.value, searchResult))

