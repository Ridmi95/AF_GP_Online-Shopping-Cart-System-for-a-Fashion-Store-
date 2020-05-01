import React from 'react';
import { Admin, Resource } from 'react-admin';
import {UserList, UserEdit, UserCreate, UserFilter} from './users';
import {PostList, PostEdit, PostCreate, PostFilter} from './posts';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
        <Admin dashboard={Dashboard} dataProvider={dataProvider}>
                <Resource name="users" icon={UserIcon} list={UserList} edit={UserEdit} create={UserCreate} filter={UserFilter} />
                <Resource name="posts" icon={PostIcon}  list={PostList} edit={PostEdit} create={PostCreate} filter={PostFilter} />
            </Admin>
    );

export default App;
