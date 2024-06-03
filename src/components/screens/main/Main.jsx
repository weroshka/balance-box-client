import { useState } from 'react'

import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import Layout from '/src/components/layout/Layout'

import styles from './Main.module.scss'
import { useAuthForm } from './useAuthForm.js'

const Main = () => {
	const [errorResponse, setErrorResponse] = useState('')

	const { errors, handleSubmit, isLoading, onSubmit, register } = useAuthForm({
		setErrorResponse
	})

	return (
		<Layout>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<div className={styles.info}>
						<div>
							<h1>BALANCE BOX</h1>
							<h2>Ваш личный помощник</h2>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Field
								error={errors?.email?.message}
								name='email'
								register={register}
								options={{
									required: 'Введите почту'
								}}
								type='email'
								placeholder='Email'
							/>
							<Field
								error={errors?.password?.message}
								name='password'
								register={register}
								options={{
									required: 'Введите пароль'
								}}
								type='password'
								placeholder='Пароль'
							/>
							<Button size='autoWight'>Войти</Button>
							<div className={styles.error}>{errorResponse}</div>
						</form>
					</div>
					<div className={styles.img}>
						<img src='/main-img.svg' alt='main' />
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Main
