import React from 'react'
import '../styles/sideMenu.scss'

interface SideMenuProps {
    setView: (view: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = (props) => {
    const switchView = (view: string) => {
        props.setView(view)
    }

    return (
        <div className='side-menu'>
            <h1>Side Menu</h1>
            <div className='menu-item' onClick={() => switchView('calculator')}>
                <h2>Calculator</h2>
            </div>
            <div className='menu-item' onClick={() => switchView('history')}>
                <h2>Currency rate history</h2>
            </div>

        </div>
    )
}