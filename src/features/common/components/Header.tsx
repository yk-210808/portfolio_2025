import React, { useRef } from 'react'
import styles from '../../../assets/styles/header.module.scss'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const link = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'works',
    path: '/works'
  },
  {
    name: 'profile',
    path: '/profile'
  },
  {
    name: 'skills',
    path: '/skills'
  }
]

export const Header = () => {
  const menuActive = useRef<number>(1)
  const currentPath = useLocation().pathname

  const handleHeaderMenu = (e: React.MouseEvent) => {
    const header = document.querySelector('.js--header')
    const target = e.target as HTMLElement

    if (menuActive.current === 1) {
      target.classList.remove('is_active')
      header?.classList.add('is_closed')
      menuActive.current = 0
    } else {
      target.classList.add('is_active')
      header?.classList.remove('is_closed')
      menuActive.current = 1
    }
  }

  return (
    <header className={`${styles.header} js--header`}>
      <div className='header-nav'>
        <button type="button" className='header-button is_active js--header-button' onClick={handleHeaderMenu}>
          <span className='inn'>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className="link-area">
          <ul>
            {link.map((item, index) => (
              <li key={index}><Link to={item.path} className={currentPath === item.path ? 'current' : ''}>{item.name}</Link></li>
            ))}
            <li><a href="https://github.com/yk-210808" target="_blank"><span>github</span><img src="./img/icon_blank.svg" alt="" className="w-4 ml-5" /></a></li>
            <li><a href="https://x.com/0o__snow" target="_blank"><span>X</span><img src="./img/icon_blank.svg" alt="" className="w-4 ml-5" /></a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}