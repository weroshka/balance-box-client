import { FaLayerGroup, FaMoneyCheckAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { GoPeople } from 'react-icons/go'
import { Link } from 'react-router-dom'

import styles from './Panel.module.scss'

const Panel = () => {
	return (
		<main className={styles.panel}>
			<div className={styles.wrapperInner}>
				<p className={styles.title}>Административная панель</p>
				<div className={styles.row}>
					<Link to='/admin/list/staff'>
						<GoPeople />
						<p>Сотрудники</p>
					</Link>

					<Link to='/admin/list/work_group'>
						<FaLayerGroup />
						<p>Отделы</p>
					</Link>

					<Link to='/admin/list/expense'>
						<FaMoneyCheckAlt />
						<p>Расходы</p>
					</Link>

					<Link to='/admin/list/time_period'>
						<FaRegCalendarAlt />
						<p>Кварталы</p>
					</Link>
				</div>
				<div className={styles.row}>
					<Link to='/admin/list/type_expenses'>
						<FaMoneyCheckAlt />
						<p>Типы расходов</p>
					</Link>

					<Link to='/admin/list/type_expenses_and_time_period'>
						<FaLayerGroup />
						<p>Макс. размер трат</p>
					</Link>

					<Link to='/admin/list/staff_group'>
						<GoPeople />
						<p>Сотрудник - Отдел</p>
					</Link>
				</div>
			</div>
		</main>
	)
}

export default Panel
