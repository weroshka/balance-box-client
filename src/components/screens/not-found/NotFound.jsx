import Layout from '/src/components/layout/Layout'

import styles from './NotFound.module.scss'

const NotFound = () => {
	return (
		<>
			<Layout>
				<main className={styles.main}>
					<img src='404.png' alt='404' />
				</main>
			</Layout>
		</>
	)
}

export default NotFound
