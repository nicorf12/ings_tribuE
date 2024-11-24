
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const DataGridCostos = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="user_id" reference="users" />
                <TextField source="title" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default DataGridCostos;