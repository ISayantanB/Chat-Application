import React, { Component } from "react";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: '',
            username: '',
            password: '',
            name: '',
            email: '',
            about: ''
        }
    }

    componentDidMount = async () => {
        document.getElementById('save').setAttribute('disabled', 'true');
        document.getElementById('save').style.opacity = '0.5'
        const response = await fetch('http://localhost:1337/api/getUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        const data = await response.json()
        this.state.data = data.username
        this.state.name = data.username.name
        this.state.email = data.username.email
        this.state.username = data.username.username
        this.state.password = data.username.password
        this.state.about = data.username.about
        document.getElementById('userNameHeading').innerHTML = this.state.data.name
        document.getElementById('userName').value = this.state.data.name
        document.getElementById('userEmail').value = this.state.data.email
        document.getElementById('userUsername').value = this.state.data.username
        document.getElementById('userPassword').value = this.state.data.password
        document.getElementById('userAbout').value = this.state.data.about
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleAbout = (event) => {
        this.setState({
            about: event.target.value
        })
    }

    edit = (element) => {
        const { data, name, email, username, password, about } = this.state
        var list, index;
        list = document.getElementsByClassName("b");
        var id = element.id.substr(4);
        if (document.getElementById(id).innerHTML === 'edit') {
            for (index = 0; index < list.length; ++index) {
                list[index].setAttribute('disabled', 'true');
            }
            document.getElementById(element.id).removeAttribute('disabled')
            document.getElementById(id).innerHTML = 'done'
            document.getElementById(id).removeAttribute('disabled')
            document.getElementById('save').setAttribute('disabled', 'true');
            document.getElementById('save').style.opacity = '0.5'
        } else {
            for (index = 0; index < list.length; ++index) {
                list[index].removeAttribute('disabled');
            }
            document.getElementById(element.id).setAttribute('disabled', 'true')
            document.getElementById(id).innerHTML = 'edit'
            if (data.name === name && data.email === email && data.username === username && data.password === password && data.about === about) {
            } else {
                document.getElementById('save').removeAttribute('disabled');
                document.getElementById('save').style.opacity = '1'
            }
        }
    }

    update = async () => {
        const { data, name, email, username, password, about } = this.state
        if (data.name === name && data.email === email && data.username === username && data.password === password && data.about === about) {
        } else {
            await fetch('http://localhost:1337/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: this.state.data._id,
                    data: {
                        name: this.state.name,
                        email: this.state.email,
                        username: this.state.username,
                        password: this.state.password,
                        about: this.state.about
                    }
                })
            })
            this.componentDidMount()
        }
    }

    render() {
        return (
            <>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <div className="bg-primary rounded-3 pt-4 my-5 mx-auto" style={{ width: "50rem", height: "50vh" }}>
                    <h1 className="w-100 text-center">Profile</h1>
                    <section className="d-flex gap-5 align-items-center">
                        <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="100" height="100" class="ms-5 d-inline-block align-text-top rounded-circle border border-danger" />
                        <h5 id="userNameHeading" className="card-title fw-bold fs-1"></h5>
                    </section>
                    <div className="card rounded-3 m-auto text-dark mt-3 pt-5" style={{ width: "50rem", height: "50vh" }}>
                        <div className="ms-4 gap-1" style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                            <div className="card-body d-flex gap-2">
                                <h6 className="text-muted my-auto">Name :</h6>
                                <input id="userName" className="fw-bolder my-auto" value={this.state.name} onChange={this.handleName} disabled />
                                <button id="Name" className="b button border-0 material-icons" onClick={() => this.edit(document.getElementById('userName'))}>edit</button>
                            </div>
                            <div className="card-body d-flex gap-2">
                                <h6 className="text-muted my-auto">Email :</h6>
                                <input id="userEmail" className="fw-bolder my-auto" value={this.state.email} onChange={this.handleEmail} disabled />
                                <button id="Email" className="b button border-0 material-icons" onClick={() => this.edit(document.getElementById('userEmail'))}>edit</button>
                            </div>
                            <div className="card-body d-flex gap-2">
                                <h6 className="text-muted my-auto">Username :</h6>
                                <input id="userUsername" className="fw-bolder my-auto" value={this.state.username} onChange={this.handleUsername} disabled />
                                <button id="Username" className="b button border-0 material-icons" onClick={() => this.edit(document.getElementById('userUsername'))}>edit</button>
                            </div>
                            <div className="card-body d-flex gap-2">
                                <h6 className="text-muted my-auto">Password :</h6>
                                <input id="userPassword" className="fw-bolder my-auto" value={this.state.password} onChange={this.handlePassword} disabled />
                                <button id="Password" className="b button border-0 material-icons" onClick={() => this.edit(document.getElementById('userPassword'))}>edit</button>
                            </div>
                        </div>
                        <div className="mx-4 gap-1" style={{ display: 'grid', gridTemplateColumns: 'auto' }}>
                            <div className="card-body d-flex gap-2">
                                <h6 className="text-muted my-auto">About :</h6>
                                <input id="userAbout" className="fw-bolder my-auto w-75" value={this.state.about} onChange={this.handleAbout} disabled />
                                <button id="About" className="b button border-0 material-icons" onClick={() => this.edit(document.getElementById('userAbout'))}>edit</button>
                            </div>
                        </div>
                        <div className="mx-4 gap-1 d-flex justify-content-end">
                            <button id="save" type="submit" className="button border-0 px-2 py-1 bg-primary rounded fw-bold text-light" style={{ opacity: '0.5' }} onClick={this.update}>Save</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile;