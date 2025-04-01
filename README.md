# Movies List App

Basic app to search for movies. You can create your lists or add movies to your favorites. Click on the movies to see details and click on the actors to see their cinematography and biography.

## How to run locally

- Install [Node.js](https://nodejs.org/es) on your computer.
- Create a new React application (make sure you select Vite when configurating).
- Then, run `npm install` to make sure all the node_modules are installed correctly.
- In the end, clone this repository in the same folder as you new project. Make sure you replace all the files that react made with the ones that the project installed.
- You may need to install some other components like `react-router-dom`, just use `npm install react-router-dom`
- And that's it! just run `npm run dev` on the same folder where the project is and click on the url that gives you, usually is `http://localhost:5173/`

## Important parts

Don't forget to create an account at [TMDB´s](https://www.themoviedb.org/) to get you API_KEY and add it to your `.env` file as `VITE_API_KEY`

## References

Based on Tech With Tim's video [Learn React With This ONE Project](https://www.youtube.com/watch?v=G6D9cBaLViA).

Used [TMDB´s](https://www.themoviedb.org/) API for consulting the data.
