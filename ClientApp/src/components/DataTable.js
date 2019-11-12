import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import RegistrationModal from './RegistrationModal';
import { USERS_API_URL } from '../constants';
import './style.css';

class DataTable extends Component {
    deleteItem = id => {
        let confirmDeletion = window.confirm('Do you really wish to delete it?');
        if (confirmDeletion) {
            fetch(`${USERS_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>ProductName</th>
                    <th>Category_ID</th>
                    <th>About</th>
                    <th>Category</th>
                    <th>Images</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>No Products yet</b></td>
                    </tr>
                    : items.map(item => (
                        <tr key={item.id}>
                            <th scope="row">
                                {item.id}
                            </th>
                            <td>
                                {item.product_Name}
                            </td>
                            <td>
                                {item.category_ID}
                            </td>
                            <td>
                                {item.about}
                            </td>
                            <td>
                                {item.category}
                            </td>
                            <td>
                                <img src={item.images} className="image" />
                            </td>
                            <td align="center">
                                <div>
                                    <RegistrationModal
                                        isNew={false}
                                        user={item}
                                        updateUserIntoState={this.props.updateState} />
                                    &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}
export default DataTable;