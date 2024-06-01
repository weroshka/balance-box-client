import { Link } from 'react-router-dom'

import styles from './ExpenseCard.module.scss'

const ExpenseCard = ({ data }) => {
	const date = new Date(data.DATA)
	return (
		<div className={styles.card}>
			<div className={styles.head}>
				<p className={styles.title}>Покупка#{data.ID}</p>
				<p className={styles.date}>
					{date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}.
					{date.getMonth() + 1 > 10
						? date.getMonth() + 1
						: '0' + (date.getMonth() + 1)}
					.{date.getFullYear()}
				</p>
			</div>
			<div className={styles.info}>
				<p>Тип: {data.type_expenses.NAME}</p>
				<p>Стоимость: {data.COST} руб.</p>
				<Link to={data.SALES_RECEIPT}>Открыть документ</Link>
			</div>
		</div>
	)
}

export default ExpenseCard
