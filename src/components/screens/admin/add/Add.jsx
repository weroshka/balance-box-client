import vocabularyService from '/src/services/vocabulary.service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import { useTableField } from '/src/hooks/useTableField.js'

import Layout from '/src/components/layout/Layout'

import styles from './Add.module.scss'
import { useAddEntityFrom } from './useAddEntityFrom'

const Add = () => {
	const [errorResponse, setErrorResponse] = useState('')

	const entity = useLocation().pathname.split('/')[3]

	const vocabulary = useQuery({
		queryKey: ['vocabulary'],
		queryFn: () => vocabularyService.getByKey(entity)
	})

	const { table, isTableLoading } = useTableField({ key: entity })

	const { errors, handleSubmit, isAddLoading, onSubmit, register, control } =
		useAddEntityFrom({ key: entity, setErrorResponse })

	if (vocabulary.isLoading || isTableLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	if (table) {
		delete table.ID
		delete table.IS_ACTIVE
	}

	if (!vocabulary.data || !table || Object.keys(table).length === 0)
		document.location.href = '/'

	return (
		<Layout>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<div className={styles.title}>
						<Link to={`/admin/list/${entity}`}>
							<FaArrowLeft />
						</Link>
						<p>
							Добавление{' '}
							{vocabulary.data.TITLE_ADD
								? vocabulary.data.TITLE_ADD.toLowerCase()
								: entity.toLowerCase()}
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						{Object.keys(table).map(element => (
							<div key={table[element].name}>
								<p>{table[element].name}</p>
								<Field
									key={table[element].name}
									error={errors?.cost?.message}
									name={table[element].name}
									register={register}
									type={
										table[element].typeName === 'String'
											? 'text'
											: table[element].typeName === 'Boolean'
												? 'checkbox'
												: table[element].typeName === 'Int'
													? 'number'
													: ''
									}
								/>
							</div>
						))}
						<Button type='main' size='autoWidth'>
							Добавить
						</Button>
						<div className={styles.error}>{errorResponse}</div>
					</form>
				</div>
			</main>
		</Layout>
	)
}

export default Add
