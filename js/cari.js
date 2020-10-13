let searchInput = document.querySelector('#searchInput'),
    searchResult = document.querySelector('#searchResult');

let dataJSON;

// ketika tombol 'c' di tekan pencarian dimulai
window.addEventListener('keydown', function(event) {
    if (event.key === 'c') {
        event.preventDefault()
        searchInput.focus()
    }
})
// ketika tombol 'esc' di tekan pencarian dihentikan
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27)
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
 * @param query, element.
 * query: the keyword that user given.
 * element: target element to show the result.
 */
const filterPostsJSON = (query, element) => {
    let result, itemsWithElement;
    query = new RegExp(query, 'ig')
    result = dataJSON.filter(item => query.test(item.title))
    itemsWithElement = result.map(item => (
        `<li class="search-result-item">
            <a href="${item.url}">
                ${item.title}
                <span class="icon">
                    <i class="fas fa-external-link-alt"></i>
                </span>
            </a>
        </li>`
    ))
    element.style.display = 'block';
    itemsWithElement.unshift(`<p class="is-size-7 px-2 py-2 has-text-dark">Tekan 'ESC' untuk membatalkan pencarian.</p>`)
    element.innerHTML = itemsWithElement.join('');
}
/**
 * searchInputAction take two arguments, event and callback
 */
const searchInputAction = (event, callback) => {
    searchInput.addEventListener(event, callback)
}
/**
 * When user focus on the search input, function getPostsJSON called.
 */
searchInputAction('focus', () => getPostsJSON().then(data => dataJSON = data))
/**
 * filtering result with the query that user given on search input.
 */
searchInputAction('keyup', (event) => filterPostsJSON(event.target.value, searchResult))
