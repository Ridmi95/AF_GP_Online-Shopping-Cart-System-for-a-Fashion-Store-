import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    Edit,
    SimpleForm,
    Create,
    EditButton,
    TextInput,
    Filter, ReferenceInput, SelectInput
} from 'react-admin';

export const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />

            <EmailField source="email" />

            <TextField source="phone" />

            <EditButton />

        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />

            <TextInput source="email" />

            <TextInput source="phone" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />

            <TextInput source="email" />

            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);
