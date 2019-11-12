import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../constants';

class RegistrationForm extends React.Component {
    state = {
        id: 0,
        product_Name: '',
        category_ID: '',
        about: '',
        category: '',
        images: ''
    }
    componentDidMount() {
        if (this.props.user) {
            const { id, product_Name, category_ID, about, category, images } = this.props.user
            this.setState({ id, product_Name, category_ID, about, category, images });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_Name: this.state.product_Name,
                category_ID: this.state.category_ID,
                about: this.state.about,
                category: this.state.category,
                images: this.state.images
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                product_Name: this.state.product_Name,
                category_ID: this.state.category_ID,
                about: this.state.about,
                category: this.state.category,
                images: this.state.images
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="product_name">Product:</Label>
                <Input type="text" name="product_name" onChange={this.onChange} value={this.state.product_Name === '' ? '' : this.state.product_Name} />
            </FormGroup>
            <FormGroup>
                <Label for="category_id">category_ID:</Label>
                <Input type="text" name="category_id" onChange={this.onChange} value={this.state.category_ID === null ? '' : this.state.category_ID} />
            </FormGroup>
            <FormGroup>
                <Label for="about">About:</Label>
                <Input type="text" name="about" onChange={this.onChange} value={this.state.about === null ? '' : this.state.about} />
            </FormGroup>
            <FormGroup>
                <Label for="category">Category:</Label>
                <Input type="text" name="category" onChange={this.onChange} value={this.state.category === '' ? '' : this.state.category} />
            </FormGroup>
            <FormGroup>
                <Label for="images">Images:</Label>
                <Input type="text" name="images" onChange={this.onChange} value={this.state.images === null ? '' : this.state.images}
                    placeholder="./image/" />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default RegistrationForm;