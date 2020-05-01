import React from 'react';
import {  List, Datagrid, Edit, Create, SimpleForm,  TextField, EditButton, TextInput, Filter,  SelectInput } from 'react-admin';

export const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput optionText="id" allowEmpty />
            <SelectInput optionText="name" />

    </Filter>
);

export const PostList = props => (
    <List {...props}>

               <Datagrid>
                   <TextField source="id" />
                   <TextField source="Category Name" />
                   <TextField source="Description" />

                   <EditButton />

               </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
      return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };

export const PostEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
                       <TextInput source="id" />
                       <TextInput source="Category Name" />
                       <TextInput multiline source="Description" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="Category Name" />
            <TextInput multiline source="Description" />
        </SimpleForm>
    </Create>
);


