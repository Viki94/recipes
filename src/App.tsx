import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { RecipesProvider } from '../contexts/RecipesContext';
import RecipeCreate from './components/recipe-create/RecipeCreate';
import RecipeEdit from './components/recipe-edit/RecipeEdit';
import UserProfile from './components/user-profile/UserProfile';
import UserFavorites from './components/user-favorites/UserFavorites';
import Recipe from './components/recipe/Recipe';
import RecipeDetails from './components/recipe-details/RecipeDetails';
// import UserRegister from './components/user-register/UserRegister';
import Register from './components/pages/Register';
// import UserLogin from './components/user-login/UserLogin';
import Login from './components/pages/Login';
// import UserInfo from './components/user-info/UserInfo';
import UserInfo from './components/pages/UserInfo';
// import UserPassword from './components/user-password/UserPassword';
import UserPassword from './components/pages/UserPassword';
//import NavMenu from './components/nav-menu/NavMenu';
import NavMenu from "./components/organisms/NavMenu";
// import NotAuthorized from './components/not-authorized/NotAuthorized';
import NotAuthorized from './components/pages/NotAuthorized';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <RecipesProvider>
          <Router>
            <NavMenu />
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Recipe />} />
                <Route path="/recipe/create" element={<RecipeCreate />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/recipe/edit/:id" element={<RecipeEdit />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/:userId/profile" element={<UserProfile />} />
                <Route path="/user/:userId/info" element={<UserInfo />} />
                <Route path="/user/:userId/password" element={<UserPassword />} />
                <Route path="/user/:userId/favorites" element={<UserFavorites />} />
                <Route path="/not-authorized" element={<NotAuthorized />} />
              </Routes>
            </div>
          </Router>
        </RecipesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
