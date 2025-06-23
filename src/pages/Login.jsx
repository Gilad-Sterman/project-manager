import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as loginAction } from '../store/user.actions'
import { userService } from '../services/user.service'
import { MsgModal } from '../cmps/MsgModal'

export function Login() {
    const [user, setUser] = useState({ username: '', password: '' })
    const [showMsgModal, setShowMsgModal] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function setNewUser({ target }) {
        const { name, value } = target
        setUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const res = await userService.login(user)
            if (res?._id) {
                loginAction(res)
                navigate('/')
            } else {
                handleErrMsg(res)
            }
        } catch (err) {
            handleErrMsg({ txt: 'שגיאה בהתחברות. נסו שוב.' })
            console.error(err)
        }
    }

    function handleErrMsg(msg) {
        setShowMsgModal(msg)
        setTimeout(() => setShowMsgModal(false), 2500)
    }

    return (
        <section className="login-page">
            <h2>התחברות</h2>
            <section className="main-content">
                <form onSubmit={onLogin}>
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
                    <button>כניסה</button>
                </form>
                <button onClick={() => navigate('/signup')}>אין לכם חשבון? הירשמו כאן</button>
                {showMsgModal && <MsgModal text={showMsgModal.txt} />}
            </section>
        </section>
    )
}
