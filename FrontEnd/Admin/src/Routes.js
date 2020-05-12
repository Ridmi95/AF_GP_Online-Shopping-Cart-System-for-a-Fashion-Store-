import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout ,index as Base} from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView, //Load template original user page
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  CreateCategory as CreateCategoryView,
  Managers as Managers,
  Users as Users

} from './views';


// manager

import Navbar from "./manager.components/manager.navbar.components";
import addproducts from "./manager.components/manager.AddProducts.components";
import productList from "./manager.components/manager.productlist.components";
import updateproduct from "./manager.components/manager.updateProduct.components";

import ManagerSignIn from "./manager.components/manager.signin.components";

// manager

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
{/* manager */}
<RouteWithLayout
        component={addproducts}
        exact
        layout={MinimalLayout}
        path="/add-product"
      />

<RouteWithLayout
        component={productList}
        exact
        layout={MinimalLayout}
        path="/dashboard-manager"
      />

<RouteWithLayout
        component={addproducts}
        exact
        layout={MinimalLayout}
        path="/add-product"
      />

<RouteWithLayout
        component={updateproduct}
        exact
        layout={MinimalLayout}
        path="/edit-product/:id"/>

<RouteWithLayout
        component={ManagerSignIn}
        exact
        layout={MinimalLayout}
        path="/manager-Sign-In"/>

      {/* manager */}



      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={CreateCategoryView}
        exact
        layout={MainLayout}
        path="/category"
      />
      <RouteWithLayout
        component={Managers}
        exact
        layout={MainLayout}
        path="/managers"
      />
      <RouteWithLayout
        component={Users}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
