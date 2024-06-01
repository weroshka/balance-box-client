import { ru } from 'date-fns/locale'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { FaRegCalendar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import { useProfile } from '/src/hooks/useProfile'
import { useTypeExpense } from '/src/hooks/useTypeExpense.js'

import Panel from '/src/components/screens/admin/panel/Panel.jsx'

import Layout from '/src/components/layout/Layout'

import styles from './Profile.module.scss'
import { useAddExpenseForm } from './useAddExpenseForm.js'

const Profile = () => {
	const [date, setDate] = useState(new Date())

	const { typeExpenseList, isTypeExpenseLoading } = useTypeExpense()

	const { user, isLoading } = useProfile()

	const { errors, handleSubmit, isAddLoading, onSubmit, register, control } =
		useAddExpenseForm({
			staffId: user ? user.ID : -1,
			userLoading: isLoading,
			date
		})

	if (isLoading || isAddLoading || isTypeExpenseLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	if (user.IS_ADMIN) {
		return (
			<Layout>
				<Panel />
			</Layout>
		)
	}

	return (
		<Layout>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<div className={styles.profile}>
						<p className={styles.userName}>
							{`${user.SURNAME} ${user.NAME} ${user.FATHER_NAME}`}
						</p>

						<div className={styles.userInfo}>
							<p>Информация</p>
							<ul>
								<li>
									<span>Отдел:</span>
									<p>
										{user.staff_group
											.map(group => group.work_group.NAME)
											.join(', ')}
									</p>
								</li>
								<li>
									<span>Почта:</span>
									<Link to={`mailto:${user.EMAIL}`}>{user.EMAIL}</Link>
								</li>
							</ul>
						</div>

						<div className={styles.work}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								encType='multipart/form-data'
							>
								<p className={styles.title}>Добавить покупку</p>
								<Controller
									name='typeExpenseId'
									control={control}
									render={({ field: { value, onChange } }) => {
										return (
											<ReactSelect
												classNamePrefix='select2-selection'
												placeholder='Тип расхода'
												title='Тип расхода'
												noOptionsMessage={({ inputValue }) =>
													!inputValue ? '' : 'Нет подходящих типов расхода'
												}
												options={typeExpenseList.map(typeExpense => ({
													value: typeExpense.ID,
													label: typeExpense.NAME
												}))}
												value={value}
												onChange={onChange}
											/>
										)
									}}
								/>
								<div className={styles.calendar}>
									<DatePicker
										showIcon
										selected={date}
										onChange={date => setDate(date)}
										icon={
											<div className={styles.calendarIcon}>
												<FaRegCalendar />
											</div>
										}
										locale={ru}
										minDate={new Date()}
										dateFormat='yyyy-MM-dd'
									/>
								</div>

								<Field
									error={errors?.cost?.message}
									name='cost'
									register={register}
									options={{
										required: 'Введите стоимость'
									}}
									type='text'
									placeholder='Стоимость'
								/>
								<Field
									error={errors?.docs?.message}
									name='docs'
									register={register}
									options={{
										required: 'Добавьте документ'
									}}
									type='file'
									placeholder='Документ'
								/>
								<Button type='white' size='autoWight'>
									ДОБАВИТЬ
								</Button>
								<Button
									size='autoWight'
									clickHandler={e => {
										e.preventDefault()
										document.location = '/expense/list'
									}}
								>
									ВСЕ РАСХОДЫ
								</Button>
							</form>

							<div className={styles.img}>
								<img src='/adding-form.svg' alt='adding-form' />
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Profile
