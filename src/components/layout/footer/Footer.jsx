import { Link } from 'react-router-dom'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.top}>
					<Link to='/'>BALANCE BOX</Link>
					<p>
						<span>Тех. поддержка:</span>
						<Link to='mailto:info@dev.balancebox.com'>
							info@dev.balancebox.com
						</Link>
					</p>
				</div>
				<div className={styles.bottom}>
					<p>
						© 1998 – 2024 ООО СК &quot;BALANCE BOX&quot;. Все права защищены.
						Полное или частичное копирование любых материалов сайта запрещено.{' '}
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
