import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { MsgModal } from "../cmps/MsgModal"

export function Settings() {
    const navigate = useNavigate()

    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [myUser, setMyUser] = useState(null)
    const [showMsgModal, setShowMsgModal] = useState(false)


    useEffect(() => {
        if (!loggedUser) {
            navigate('/login')
            return
        }

        setMyUser(loggedUser)
    }, [loggedUser])

    function handleInput({ target }) {
        myUser[target.name] = target.value
        const newUse = JSON.parse(JSON.stringify(myUser))
        setMyUser(newUse)
    }

    async function onSaveUsername(ev) {
        ev.preventDefault()
        if (myUser.username === loggedUser.username) return
        try {
            const newUser = await userService.updateUserDetails('username', myUser.username, loggedUser)
            setShowMsgModal({ txt: 'המידע נשמר בהצלחה' })
            setTimeout(() => setShowMsgModal(false), 2500)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="settings-page" >
            <h1>הגדרות</h1>
            {myUser && <div className="main-content">
                <img className="user-img" src={loggedUser.imgUrl || 'https://res.cloudinary.com/dollaguij/image/upload/v1716310059/icons/kord/account_me6aym.png'} alt="" />
                <form className="user-details">
                    <div className="my-input">
                        <label htmlFor="username">שם משתמש:</label>
                        <input type="text" name="username" value={myUser.username} id="username" onInput={handleInput} />
                    </div>
                    <div className="my-input">
                        <label htmlFor="lists">מספר רשימות:</label>
                        <input type="number" value={myUser.lists.length} id="lists" disabled />
                    </div>
                    <div className="my-input">
                        <label htmlFor="items">מספר פריטים:</label>
                        <input type="number" value={myUser.items.length} id="items" disabled />
                    </div>
                    <button className="btn-save" onClick={(ev) => onSaveUsername(ev)}>שמירה</button>
                </form>
            </div>}
            {showMsgModal && <MsgModal text={showMsgModal.txt} />}
        </section>
    )
}