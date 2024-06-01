import vocabularyService from '/src/services/vocabulary.service'
import { useQuery } from '@tanstack/react-query'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import { useTableElementDelete } from '/src/hooks/useTableElementDelete.js'
import { useTableField } from '/src/hooks/useTableField.js'

import Layout from '/src/components/layout/Layout'

import styles from './Edit.module.scss'
import { useEditEntityFrom } from './useEditEntityFrom.js'

const Edit = () => {
	const pathArr = useLocation().pathname.split('/')
	const entity = pathArr[3]
	const id = pathArr[4]

	const vocabulary = useQuery({
		queryKey: ['vocabulary'],
		queryFn: () => vocabularyService.getByKey(entity)
	})

	const { table, isTableLoading } = useTableField({ key: entity })

	const { errors, handleSubmit, isEddLoading, onSubmit, register, control } =
		useEditEntityFrom({
			id: id,
			key: entity
		})

	const { deleteMutate, isDeleteMutateLoading } = useTableElementDelete({
		id: id,
		key: entity
	})

	if (vocabulary.isLoading || isTableLoading || isDeleteMutateLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	if (table) {
		delete table.ID
		delete table.PASSWORD
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
							Изменение{' '}
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
							Изменить
						</Button>
						<Button
							type='warning'
							size='autoWidth'
							clickHandler={e => {
								e.preventDefault()
								deleteMutate()
							}}
						>
							||| УДАЛИТЬ |||
						</Button>
					</form>
				</div>
			</main>
		</Layout>
	)
}

export default Edit
