import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user.actions'

export function UserPreview() {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onClick() {
        if (location.pathname === '/settings') {
            logout()
            navigate('/login')
        } else {
            navigate('/settings')
        }
    }

    if (!loggedUser) return null

    return (
        <button className="user-preview" onClick={onClick}>
            {location.pathname === '/settings' ? (
                <img
                    src="https://res.cloudinary.com/dollaguij/image/upload/v1702281692/icons8-logout-32_rpd7my.png"
                    alt="logout"
                    className='logout'
                />
            ) : (
                <img
                    src={loggedUser.imgUrl || "https://res.cloudinary.com/dollaguij/image/upload/v1716310059/icons/kord/account_me6aym.png"}
                    alt="User"
                />
            )}
        </button>
    )
}
