import { createContext, useState, useContext, useEffect } from "react";

const ListContext = createContext();

export const useListContext = () => useContext(ListContext);

export const ListProvider = ({ children }) => {
    const [lists, setLists] = useState(() => {
        const storedLists = localStorage.getItem('movieLists');
        return storedLists ? JSON.parse(storedLists) : [];
    });

    useEffect(() => {
        localStorage.setItem('movieLists', JSON.stringify(lists));
    }, [lists]);

    const createList = (listName, listDescription) => {
        if (listName.trim() === '') return;
        const newList = {
            id: Date.now(),
            createdAt: new Date(),
            owner_id: 1,
            list_name: listName,
            list_description: listDescription,
            is_favorite_list: false,
            movies: []
        };
        setLists((prevLists) => [...prevLists, newList]);
    }

    const editList = (listId, listName, listDescription) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === Number(listId)
                    ? {...list, list_name: listName, list_description: listDescription}
                    : list
            )
        );
    };

    const deleteList = (listId) => {
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    };

    const addMovieToList = (listId, movie) => {
        setLists((prevLists) => 
            prevLists.map((list) => {
                if (list.id === Number(listId)) {
                    if (list.movies.some((m) => m.id === movie.id)) {
                        return list;
                    }
                    return {...list, movies: [...list.movies, movie]};
                }
                return list;
            })
        );
    };

    const removeMovieFromList = (listId, movieId) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === Number(listId)
                    ? {...list, movies: list.movies.filter((movie) => movie.id !== movieId)}
                    : list
            )
        );
    };

    const isMovieInList = (listId, movieId) => {
        return lists.find((list) => list.id === Number(listId)).movies.some((movie) => movie.id === movieId);
    }

    const getList = (listId) => {
        return lists.find((list) => list.id === Number(listId));
    }

    const value = {
        lists,
        createList,
        editList,
        deleteList,
        addMovieToList,
        removeMovieFromList,
        isMovieInList,
        getList,
    };

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};