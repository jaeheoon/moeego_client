import React, { createContext, useState } from 'react';

const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
    const [article, setArticle] = useState('');

    return (
        <ArticleContext.Provider value={{ article }}>
            {children}
        </ArticleContext.Provider>
    );
};

export { ArticleProvider };