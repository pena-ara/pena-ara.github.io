let searchInput = document.querySelector('#searchInput'),
    searchResult = document.querySelector('#searchResult');

let dataJSON;


// ketika tombol 'esc' di tekan pencarian dihentikan
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 8)
    {
        searchInput.value = '';
        searchResult.innerHTML = '';
        searchInput.blur()
    }
})
/**
 * mendapatkan daftar catatan kedalam format json
 */
const getPostsJSON = async () => {
    let response = await fetch('/index.json')
    let data = await response.json()
    return data
}
/**
 * element: target element to show the result.
 */
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
/**
 * searchInputAction take two arguments, event and callback
 */
const searchInputAction = (event, callback) => {
    searchInput.addEventListener(event, callback)
}
/**
 * focus on the search input, function getPostsJSON .
 */
searchInputAction('focus', () => getPostsJSON().then(data => dataJSON = data))
/**
 * filtering result with the query on search input.
 */
searchInputAction('keyup', (event) => filterPostsJSON(event.target.value, searchResult))
