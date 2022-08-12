import React, { createElement } from "react"
import { Link } from "react-router-dom"
import { Component } from "react"

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usernameTo: '',
            message: ''
        }
    }

    componentDidMount = async () => {
        const response = await fetch('http://localhost:1337/api/getUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        const data = await response.json()
        document.getElementById('usernameFrom').innerHTML = data.username.username
    }

    handleMessageChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    search = async (event) => {
        event.preventDefault()
        while (document.getElementById('searchUsername').hasChildNodes()) {
            document.getElementById('searchUsername').removeChild(document.getElementById('searchUsername').firstChild)
        }
        if (document.getElementById('searchUsernameIn').value != '') {
            var response = await fetch('http://localhost:1337/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usernameTo: document.getElementById('searchUsernameIn').value
                })
            })
            const data = await response.json()
            if (data.exist.length != 0) {
                data.exist.forEach(options => {
                    const option = document.createElement('option')
                    option.value = options.username
                    document.getElementById('searchUsername').appendChild(option)
                });
                this.state.usernameTo = document.getElementById('searchUsernameIn').value
            }
        }
    }

    username = async (event) => {
        if (event != undefined) {
            event.preventDefault()
        }
        var data = ''
        this.state.usernameTo = document.getElementById('usernames').value
        while (document.getElementById('usernames').hasChildNodes()) {
            document.getElementById('usernames').removeChild(document.getElementById('usernames').firstChild);
        }
        var response = await fetch('http://localhost:1337/api/getRelation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        data = await response.json()
        if (data.status) {
            window.location.href = '/login'
        }
        if (this.state.usernameTo == '') {
            document.getElementById('messages').innerHTML = ''
        } else {
            if (this.state.usernameTo == 'me') {
                document.getElementById('username').innerHTML = document.getElementById('usernameFrom').innerHTML
                const response = await fetch('http://localhost:1337/api/selfTalk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: this.state.message
                    })
                })
                data = await response.json()
            } else {
                const response = await fetch('http://localhost:1337/api/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usernameTo: this.state.usernameTo,
                        message: this.state.message
                    })
                })
                data = await response.json()
            }
            let messageBox = document.getElementById('messages')
            data.message.forEach(message => {
                const span = document.createElement('span')
                const div = document.createElement('div')
                span.innerHTML = message.message_Body + '&nbsp&nbsp<sub>' + new Date(message.time).toLocaleTimeString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</sub>'
                span.style.borderRadius = '50px'
                span.style.padding = '0.3rem 1rem 0.3rem 1rem'
                div.style.margin = '0.25rem 0 0.25rem 0'
                div.style.display = 'flex'
                if (this.state.usernameTo == 'me') {
                    div.style.paddingRight = '0.3rem'
                    span.style.borderTopRightRadius = '0'
                    div.style.justifyContent = 'flex-end'
                    span.style.backgroundColor = 'green'
                } else if (this.state.usernameTo === message.id && this.state.usernameTo !== message.id_To) {
                    div.style.paddingLeft = '0.3rem'
                    span.style.borderTopLeftRadius = '0'
                    div.style.justifyContent = 'flex-start'
                    span.style.backgroundColor = 'blue'
                } else if (this.state.usernameTo === message.id_To && this.state.usernameTo !== message.id) {
                    div.style.paddingRight = '0.3rem'
                    span.style.borderTopRightRadius = '0'
                    div.style.justifyContent = 'flex-end'
                    span.style.backgroundColor = 'green'
                }
                div.appendChild(span)
                messageBox.appendChild(div)
            });
        }
        let option = document.createElement('option')
        option.value = ''
        option.innerText = 'Select Person'
        document.getElementById('usernames').appendChild(option)
        option = document.createElement('option')
        option.value = option.innerText = 'me'
        document.getElementById('usernames').appendChild(option)
        if (data.relation.length) {
            data.relation.forEach(relation => {
                let option = document.createElement('option')
                option.value = option.innerText = relation.id2
                document.getElementById('usernames').appendChild(option)
            });
        }
        document.getElementById('username').innerHTML = this.state.usernameTo
        if (this.state.usernameTo == '') {
            response = await fetch('http://localhost:1337/api/getUsernameInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usernameTo: document.getElementById('usernameFrom').innerHTML
                })
            })
        } else {
            response = await fetch('http://localhost:1337/api/getUsernameInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usernameTo: this.state.usernameTo
                })
            })
        }
        data = await response.json()
        document.getElementById('userName').innerHTML = data.username.name
        document.getElementById('userEmail').innerHTML = data.username.email
        document.getElementById('userUsername').innerHTML = data.username.username
        document.getElementById('userAbout').innerHTML = data.username.about
    }

    message = async (event) => {
        if (event != undefined) {
            event.preventDefault()
        }
        document.getElementById('text').placeholder = 'Write Something...'
        document.getElementById('text').value = ''
        while (document.getElementById('messages').hasChildNodes()) {
            document.getElementById('messages').removeChild(document.getElementById('messages').firstChild);
        }
        var data = ''
        if (this.state.usernameTo != '') {
            let response = ''
            if (this.state.usernameTo == 'me') {
                response = await fetch('http://localhost:1337/api/selfTalk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: this.state.message
                    })
                }
                )
            } else {
                response = await fetch('http://localhost:1337/api/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usernameTo: this.state.usernameTo,
                        message: this.state.message
                    })
                }
                )
            }
            const data = await response.json()
            this.state.message = ''
            if (!data.status) {
                window.location.href = '/login'
            }
            var messageBox = document.getElementById('messages')
            data.message.forEach(message => {
                const span = document.createElement('span')
                const div = document.createElement('div')
                span.innerHTML = message.message_Body + '&nbsp&nbsp<sub>' + new Date(message.time).toLocaleTimeString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + '</sub>'
                span.style.borderRadius = '50px'
                span.style.padding = '0.3rem 1rem 0.3rem 1rem'
                div.style.margin = '0.25rem 0 0.25rem 0'
                div.style.display = 'flex'
                if (this.state.usernameTo == 'me') {
                    div.style.paddingRight = '0.3rem'
                    span.style.borderTopRightRadius = '0'
                    div.style.justifyContent = 'flex-end'
                    span.style.backgroundColor = 'green'
                } else if (this.state.usernameTo === message.id && this.state.usernameTo !== message.id_To) {
                    div.style.paddingLeft = '0.3rem'
                    span.style.borderTopLeftRadius = '0'
                    div.style.justifyContent = 'flex-start'
                    span.style.backgroundColor = 'blue'
                } else if (this.state.usernameTo === message.id_To && this.state.usernameTo !== message.id) {
                    div.style.paddingRight = '0.3rem'
                    span.style.borderTopRightRadius = '0'
                    div.style.justifyContent = 'flex-end'
                    span.style.backgroundColor = 'green'
                }
                div.appendChild(span)
                messageBox.appendChild(div)
            });
            document.getElementById('username').innerHTML = this.state.usernameTo
        }
    }

    render() {
        const { message } = this.state
        return (
            <>
                <div className="float-start d-flex flex-column gap-3 h-100" style={{ width: '49%' }}>
                    <nav class="nabar navbar-dark mx-1 my-3 p-2 bg-secondary rounded">
                        <div class="navbar-brand mx-3">
                            <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="30" class="d-inline-block align-text-top rounded-circle border border-danger" />
                            <Link to="/profile" state={{ username: this.state.usernameTo }} id="usernameFrom" className="navbar-brand text-decoration-none mb-0 h1 mx-2 text-info fw-bolder" onClick={this.profile}></Link>
                        </div>
                    </nav>
                    <select name="usernames" id="usernames" className="w-50 m-auto py-1 rounded-pill" onClick={this.username}>
                        <option value="">Select Person</option>
                    </select>
                    <form onSubmit={this.message} className="form-label px-5 py-4 d-flex flex-column m-auto gap-2 bg-info border-primary border-start border-3 rounded">
                        <p className="m-auto text-dark fw-bold">Search Username</p>
                        <input list="searchUsername" id="searchUsernameIn" placeholder="Username" onChange={this.search} />
                        <datalist id="searchUsername"></datalist>
                        <button type="submit" style={{ backgroundColor: '#6ea8fe' }}>Start Chat</button>
                    </form>
                    <nav class="navbar m-1 bg-secondary rounded">
                        <div class="navbar-brand mx-3">
                            <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="30" class="d-inline-block align-text-top rounded-circle border border-danger" />
                            <span id="username" className="navbar-brand mb-0 h1 mx-2 text-info"></span>
                        </div>
                    </nav>
                    <section className="m-1 p-2">
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                            <div className="card-body d-flex gap-1">
                                <h6 className="my-auto">Name:</h6>
                                <p id="userName" className="fw-bolder my-auto"></p>
                            </div>
                            <div className="card-body d-flex gap-1">
                                <h6 className="my-auto">Email:</h6>
                                <p id="userEmail" className="fw-bolder my-auto"></p>
                            </div>
                            <div className="card-body d-flex gap-1">
                                <h6 className="my-auto">Username:</h6>
                                <p id="userUsername" className="fw-bolder my-auto"></p>
                            </div>
                        </div>
                        <div className="mx-auto" style={{ display: 'grid', gridTemplateColumns: 'auto' }}>
                            <div className="card-body d-flex gap-1">
                                <h6 className="my-auto">About:</h6>
                                <p id="userAbout" className="fw-bolder my-auto w-100"></p>
                            </div>
                        </div>
                    </section>
                </div>
                <nav class="navbar mt-1 bg-secondary rounded">
                    <span className="navbar-brand mb-0 h1 mx-2 text-info">Chat History</span>
                </nav>
                <div id="messages" className="d-flex flex-column" onLoad={this.message} style={{ top: '3.5rem', right: '0', position: 'absolute', overflowY: 'scroll', width: '51%', height: '85%', backgroundColor: 'rgb(100, 100, 100)' }}></div>
                <div className="fixed-bottom d-flex justify-content-end">
                    <form onSubmit={this.message} className='d-flex m-2 me-4' style={{ width: '49%' }}>
                        <input id="text" className="mx-1 w-100 px-3 border rounded-pill" value={message} onChange={this.handleMessageChange} placeholder="Write Something..." />
                        <button type="submit" className="rounded-pill bg-secondary d-flex align-items-center gap-1"><b>Send</b>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

export default Chat;