import vocabularyService from '/src/services/vocabulary.service'
import { useQuery } from '@tanstack/react-query'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import Button from '../../../ui/button/Button'
import Loader from '/src/components/ui/Loader'

import { useTableData } from '/src/hooks/useTableData.js'
import { useTableField } from '/src/hooks/useTableField.js'

import Layout from '/src/components/layout/Layout'

import styles from './List.module.scss'

const List = () => {
	const entity = useLocation().pathname.split('/')[3]

	const vocabulary = useQuery({
		queryKey: ['vocabulary'],
		queryFn: () => vocabularyService.getByKey(entity)
	})

	const { table, isTableLoading } = useTableField({ key: entity })

	const { tableData, isTableDataLoading } = useTableData({ key: entity })

	if (vocabulary.isLoading || isTableLoading || isTableDataLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}
	const fields = []
	const fieldsKeys = Object.keys(table)
	const fieldExc = ['IS_ACTIVE', 'PASSWORD', 'IS_ADMIN']

	for (let i = 0; i < fieldsKeys.length; i++)
		if (!fieldExc.includes(fieldsKeys[i])) fields.push(fieldsKeys[i])

	if (!vocabulary.data || !fields) document.location.href = '/'

	return (
		<Layout>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<div className={styles.title}>
						<Link to='/'>
							<FaArrowLeft />
						</Link>
						<p>
							Список{' '}
							{vocabulary.data.TITLE_LIST
								? vocabulary.data.TITLE_LIST.toLowerCase()
								: entity.toLowerCase()}
						</p>
					</div>

					<div className={styles.addPanel}>
						<Button
							type='white'
							clickHandler={() => (document.location = `/admin/add/${entity}`)}
						>
							Добавить
						</Button>
					</div>

					{tableData && tableData.length > 0 ? (
						<table className={styles.table}>
							<thead>
								<tr>
									{fields.map(field => (
										<th key={field}>{field}</th>
									))}
									<th>*</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map(element => (
									<tr key={element.ID}>
										{Object.keys(element).map(field => {
											if (
												field !== 'PASSWORD' &&
												field !== 'IS_ADMIN' &&
												field !== 'IS_ACTIVE'
											)
												return <th key={field}>{element[field]}</th>
										})}
										<th
											className={styles.edit}
											onClick={() =>
												(document.location = `/admin/edit/${entity}/${element.ID}`)
											}
										>
											<FaEdit />
										</th>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<></>
					)}
				</div>
			</main>
		</Layout>
	)
}

export default List
