import Cookies from 'js-cookie'
import { FaCircleUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import { useAuth } from '/src/hooks/useAuth'

import styles from './Header.module.scss'

const Header = () => {
	const { isAuth } = useAuth()
	const userRole = +Cookies.get('role')

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link to='/'>
					<img src='/svg/logo.svg' alt='' />
				</Link>

				<div className={styles.nav}>
					<Link to={!isAuth ? '/' : '/logout'}>
						<p>{!isAuth ? 'Войти' : 'Выйти'}</p>
						<FaCircleUser />
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
