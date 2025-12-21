# OMDB Films

## Introduction
Project to query into the [OMDb API](https://www.omdbapi.com/) database.

![alt OMDB Film search screenshot](/etc/screenshot.png)

Production link: [OMDB Films](https://neuroflip.github.io/OMDBFilms/)

### Features

- Login / Register form (with no activation link)
- search using a search term and a film type (movie, serie, episode)
- infinite scroll in search results
- film detail view 
- imdb external link for each film entry
- shareable detail film url
- responsive UI

## Install and run

1. Clone this repo:
```bash
$ git clone https://github.com/neuroflip/OMDBFilms.git
```
2. Install the dependencies:
```bash
$ npm install
```
3. Run in dev mode:
```bash
$ npm run dev
```
4. Or run it on production mode:
```bash
$ npm run build
$ npm run preview
```
5. Run the tests:
```bash
$ npm run test
```
6. Run the tests report in browser:
```bash
$ npm run test:ui
```
7. Run the tests coverage
```bash
$ npm run test:coverage
```
8. Run the linter analisis:
```bash
$ npm run lint
```

<br>

## Project structure

The project is structured using the next philosophy:

- /src: all the source code organized as:
  - /src/components: common code used broadly
  - /src/features: app features like:
    - /src/features/filmDetail: individual film view and film urls
    - /src/features/Landing: landing functionality
    - /src/features/NotFound404: 404 functionality
    - /src/features/Login: login functionality
    - /src/features/Register: register functionality
    - /src/features/Search: search functionality
  - /src/helpers: fetch and supabase client code
  - /src/pages: implementation of the main route pages
  - /src/store: main store creation code
  - /src/hooks: 
- all the components are self included having react component code, custom hooks, css styles, image assets, types and store slices and selectors

## Components diagram: 


## Considerations

- The React Router is using HashRouter to support github pages deploy. This allows to github pages serve path routes using hash urls like https://neuroflip.github.io/OMDBFilms/#/film/tt0103064
- Using supabase to support login with email / password and store users. The implementation and supabase configuration does not uses email verification links
- The search results page implements a infinite scroll using IntersectionObserver. It is implemented as a custom hook.
- There is url guard protection implemented using a custom hook used in all the private routes (like /search one)
- Some components with more complex logic are using custom hooks to separate logic from UI
- The supabase client and the fetch code is using environment variables (not uploaded into this repo to keep the secrets not private). There is a .env.example file with no keys provided as example.
- The deploy process at .github/workflows/ghpages.yml creates a production .env file using environment variables declared in github.

## Testing

- Tests implemented using vitest.

## CI pipeline

The project is managing a CI process using test execution and eslint execution using github actions. Check file .github/workflows/main.yml for more information. This pipeline is executed when some developer wants creates a PR to integrate into main (as example).

![alt ci pipeline execution result in a correct PR](/etc/ci.png)

<br />
