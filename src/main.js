const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});
// UTILS
const printMovies = (elements, section) => {
    section.innerHTML = "";
    console.log(elements);
    elements.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + element.id;
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', element.title);
        movieImg.setAttribute(
            'src', 
            'https://image.tmdb.org/t/p/w300' + element.poster_path);
        movieContainer.appendChild(movieImg)
        section.appendChild(movieContainer);
    });
}
const printCategories = (elements, section) => {
    section.innerHTML = "";
    elements.forEach(element => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + element.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${element.id}-${element.name}`;
        })
        const categoryTitleText = document.createTextNode(element.name);
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        section.appendChild(categoryContainer);
    });
}
//LLAMADOS A API
const getTrendingMoviesPreview = async () => {  
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies);
    printMovies(movies, trendingMoviesPreviewList);
}
const getCategoriesPreview = async () => {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    printCategories(categories, categoriesPreviewList);

}
const getMoviesByCategory = async (id) => {  
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    printMovies(movies, genericSection);
}
const getMoviesBySearch = async (query) => {  
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    printMovies(movies, genericSection);
};
const getTrendingMovies = async () => {  
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    printMovies(movies, genericSection);
}
const getMovieById = async (id) => {  
    const { data: movie } = await api(`movie/${id}`); //data recibe objeto data la cual se renombra a movie

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    printCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id);
}
const getRelatedMoviesById = async (id) => { // peliculas similares o relacionadas con x película. (en el área de descripción de película) 
    const { data } = await api(`movie/${id}/similar`);
    const movies = data.results;
    console.log(data, movies);
    printMovies(movies, relatedMoviesContainer);
}