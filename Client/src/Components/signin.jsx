import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom';

class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            about: 'Hi!!'
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handlAboutChange = (event) => {
        this.setState({
            about: event.target.value
        })
    }

    signinUser = async(event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': this.state.name,
                'email': this.state.email,
                'username': this.state.username,
                'password': this.state.password,
                'about': this.state.about
            })
        })
        const data = await response.json()
        if (data.status) {
            alert('User has been registered successfully!! Try to login...')
            window.location.href = '/login'
        } else {
            alert('Failed to signin or already an user. Try again...')
        }
    }

    render() {
        const { name, email, username, password } = this.state
        return (
            <>
                <form onSubmit={this.signinUser}>
                    <div className="card w-75 bg-secondary text-light rounded-end rounded-3 mx-auto">
                        <div className="card-body">
                            <h3 className="card-title text-center fw-bold">Sign In</h3>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="name" className="form-control" id="name" name="Name" value={name} onChange={this.handleNameChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user" className="form-label">Username</label>
                                <input type="username" className="form-control" id="user" name="Username" value={username} onChange={this.handleUsernameChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="mail" name="Email" value={email} onChange={this.handlEmailChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="Password" value={password} onChange={this.handlPasswordChange} required />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                                <label className="form-check-label" htmlFor="exampleCheck1">Accept Terms & Conditions</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <div className='w-75 d-flex flex-row-reverse text-light mx-auto my-2'>
                    <p>Already have an account? <Link to='/login' className='text-decoration-none text-info'>Login</Link></p>
                </div>
            </>
        );
    }
}

export default Signin;