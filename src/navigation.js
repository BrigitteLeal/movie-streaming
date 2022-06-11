
const navigator = () => {
    console.log({ location });
    if(location.hash.startsWith('#trends')){ //location - Propiedad del navegador de JS que permite leer la URL en la que nos encontramos actualmente, entre sus propiedades está el hash, puerto, ruta, etc
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    }  else {
        homePage();
    }
    document.body.scrollTop = 0; //permite que la vista de la pagina sea desde el comienzo (0 pixels);
    document.documentElement.scrollTop = 0;
}
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false); //onhaschange: Permite que ejecutemos cierto código cada vez que cambie nuestro hash
searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`; // método trim() se pueden evitar fallas en la búsqueda cuando haya espacios en blanco al principio o al final del string.
});
trendingBtn.addEventListener('click', () => {
    
    location.hash = '#trends';
})
arrowBtn.addEventListener('click', () => {
    history.back();
    // location.hash = '#home';
})

const trendsPage = () => {
    console.log('TRENDS!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); // agrega display none cuando está en home
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive') //remueve la clase inactive para que pueda ser visualizado
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = "Tendencias";

    getTrendingMovies();
}
const searchPage = () => {
    console.log('SEARCH!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); // agrega display none cuando está en home
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive') //remueve la clase inactive para que pueda ser visualizado
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('='); // ['#search', '#busqueda]
    getMoviesBySearch(query);
}
const categoryPage = () => {
    console.log('CATEGORIES!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); // agrega display none cuando está en home
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive') //remueve la clase inactive para que pueda ser visualizado
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const url = location.hash.split('='); // ['#category', '#id-name]
    const categoryData = url[1];
    const [categoryId, categoryName] = categoryData.split('-'); // categoryId = elemento-array[0], categoryName = elemento-array[1]
    const newName2 = decodeURI(categoryName);
    headerCategoryTitle.innerHTML = newName2;

    getMoviesByCategory(categoryId);
}
const movieDetailsPage = () => {
    console.log('MOVIE!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); // agrega display none cuando está en home
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive') //remueve la clase inactive para que pueda ser visualizado
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('='); // ['#movie', '24342]
    console.log(movieId);
    getMovieById(movieId);
}
const homePage = () => {
    console.log('HOME!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive'); // agrega display none cuando está en home
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive') //remueve la clase inactive para que pueda ser visualizado
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview(); 
}