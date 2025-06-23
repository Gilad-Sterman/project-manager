import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as loginAction } from '../store/user.actions'
import { userService } from '../services/user.service'
import { MsgModal } from '../cmps/MsgModal'

export function Signup() {
    const [user, setUser] = useState({ username: '', password: '' })
    const [showMsgModal, setShowMsgModal] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function setNewUser({ target }) {
        const { name, value } = target
        setUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    async function onSignup(ev) {
        ev.preventDefault()
        try {
            const res = await userService.signup(user)
            if (res?._id) {
                loginAction(res)
                navigate('/')
            } else {
                handleErrMsg({ txt: 'Signup failed. Please try again.' })
            }
        } catch (err) {
            handleErrMsg({ txt: 'Signup error. Please check details.' })
            console.error(err)
        }
    }

    function handleErrMsg(msg) {
        setShowMsgModal(msg)
        setTimeout(() => setShowMsgModal(false), 2500)
    }

    return (
        <section className="signup-page">
            <h2>הרשמה</h2>
            <section className="main-content">
                <form onSubmit={onSignup}>
                    <div className="my-input">
                        <label htmlFor="username">שם משתמש:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={user.username}
                            onChange={setNewUser}
                            required
                        />
                    </div>
                    <div className="my-input">
                        <label htmlFor="password">סיסמא:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={setNewUser}
                            required
                        />
                    </div>
                    <button>הרשמה</button>
                </form>
                <button onClick={() => navigate('/login')}>יש לכם חשבון? היכנסו כאן</button>
                {showMsgModal && <MsgModal text={showMsgModal.txt} />}
            </section>
        </section>
    )
}
