import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, PlusCircle, Users, Package, LayoutDashboard, LogOut } from 'lucide-react'

export function AppHeader() {
    const navigate = useNavigate()

    return (
        <header className="app-header">
            <div className="left" onClick={() => navigate('/')}>
                <LayoutDashboard size={20} />
                <span>ניהול פרוייקטים</span>
            </div>

            <nav className="center-nav">
                <NavLink to="/"><Home size={16} /> ראשי</NavLink>
                <NavLink to="/team"><Users size={16} /> צוות</NavLink>
                <NavLink to="/items"><Package size={16} /> מחסן</NavLink>
            </nav>

            <div className="right">
                <button className="btn-add-header">
                    <LogOut />
                </button>
            </div>
        </header>
    )
}
