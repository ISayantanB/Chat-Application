import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    loginUser = async(event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password
            })
        })
        const data = await response.json()
        console.log(data)
        if (data.status) {
            alert('Login successful!!')
            window.location.href = '/user'
        }
        else{
            alert('Incorrect username or password...')
        }
    }

    render() {
        const {username, password} = this.state
        return (
            <>
            <form onSubmit={this.loginUser}>
                <div className="card w-75 bg-secondary text-light rounded-end rounded-3 mx-auto">
                    <div className="card-body">
                        <h3 className="card-title text-center fw-bold">Login</h3>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="username" className="form-control" id="username" name='Username' value={username} onChange={this.handleUsernameChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="Password" value={password} onChange={this.handlPasswordChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
            <div className='w-75 d-flex flex-row-reverse text-light mx-auto my-2'>
            <p>Don't have an account? <Link to='/signin' className='text-decoration-none text-info'>Signin</Link></p>
        </div>
            </>
        );
    }
}

export default Login;