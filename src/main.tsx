import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import theme from './theme';
import App from './App';
import Category from './pages/CategoryPage';
import Article from './pages/ArticlePage';
import BookList from './pages/BookListPage';
import Book from './pages/BookPage';
import KeepAlive from './keep-alive';


const router = createBrowserRouter([
  {
    path: "/",
    element: <KeepAlive />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/book/list/:catId",
        element: <BookList />,
      },
      {
        path: "/book/:bookId",
        element: <Book />,
      },
      {
        path: "/book/article/:bookId/:chapterId",
        element: <Article />,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  // </React.StrictMode>,
);
