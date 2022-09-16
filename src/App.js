import { Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import AddCourse from "./screens/pages/courses/add/AddCourse";
import UpdateCourse from "./screens/pages/courses/update/UpdateCourse";
import ShowCourse from "./screens/pages/courses/show/ShowCourse";
import DashbordScreen from "./screens/pages/dashbord/DashbordScreen";
import AddLesson from "./screens/pages/lessons/add/AddLesson";
import UpdateLesson from "./screens/pages/lessons/update/UpdateLesson";
import ShowLesson from "./screens/pages/lessons/show/ShowLesson";
import SideBar from "./screens/pages/SideBar";
import AddArticles from "./screens/pages/articles/AddArticles";
import ShowArticle from "./screens/pages/articles/ShowArticale";
import UpdateArticle from "./screens/pages/articles/UpdateArtical";
import AddCustomer from "./screens/pages/customer/AddCustomer";
import ShowCustomer from "./screens/pages/customer/ShowCustomer";
import UpdateCustomer from "./screens/pages/customer/UpdateCustomer";
import AddProduct from './screens/pages/product/AddProduct';
import ShowProduct from './screens/pages/product/ShowProduct';
import HomeScreen from './screens/pages/home/HomeScreen'
import Categories from './screens/pages/categories/Categories'
import NotFound from "./screens/pages/NotFound";
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { StyledEngineProvider } from "@mui/styled-engine-sc";

function App() {

  const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();
      console.log('beforeunload event triggered');
      return (event.returnValue = 'Are you sure you want to exit?');
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/admin" element={<SideBar />}>
              <Route path="dashbord" element={<DashbordScreen />} />

              <Route path="addCourse" element={<AddCourse />} />
              <Route path="showCourse" element={<ShowCourse />} />
              <Route path="updateCourse" element={<UpdateCourse />}>
                <Route path=":id" element={<UpdateCourse />} />
              </Route>

              <Route path="addLesson" element={<AddLesson />} />
              <Route path="updateLesson" element={<UpdateLesson />} >
                <Route path=":id" element={<UpdateLesson />} />
              </Route>
              <Route path="showLesson" element={<ShowLesson />} />

              <Route path="addArticle" element={<AddArticles />} />
              <Route path="showArticle" element={<ShowArticle />} />
              <Route path="updateArticle" element={<UpdateArticle />}>
                <Route path=":id" element={<UpdateArticle />} />
              </Route>

              <Route path="addCustomer" element={<AddCustomer />} />
              <Route path="showCustomer" element={<ShowCustomer />} />
              <Route path="updateCustomer" element={<UpdateCustomer />}>
                <Route path=":id" element={<UpdateCustomer />} />
              </Route>

              <Route path="addProduct" element={<AddProduct />} />
              <Route path="showProduct" element={<ShowProduct />} />
              <Route path="updateProduct" element={<AddProduct />}>
                <Route path=":id" element={<AddProduct />} />
              </Route>

              <Route path="categories" element={<Categories />} />

            </Route>
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

export default App;
