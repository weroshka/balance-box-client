import cn from 'clsx'
import 'react-datepicker/dist/react-datepicker.css'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Loader from '/src/components/ui/Loader'
import ExpenseCard from '/src/components/ui/card/expense/ExpenseCard.jsx'
import NextButton from '/src/components/ui/slider/buttons/Next/NextButton'
import PrevButton from '/src/components/ui/slider/buttons/Prev/PrevButton'

import { useExpense } from '/src/hooks/useExpense.js'

import Layout from '/src/components/layout/Layout'

import styles from './ExpenseList.module.scss'

const ExpenseList = () => {
	const { expenseList, isExpenseIsLoading } = useExpense()

	if (isExpenseIsLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	const settings = {
		className: 'center',
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		padding: '60px',
		slidesToScroll: 3,
		rows: 2,
		adaptiveHeight: true,
		nextArrow: <NextButton />,
		prevArrow: <PrevButton />
	}

	return (
		<Layout>
			<main className={styles.main}>
				<div className={cn(styles.wrapperInner, styles.expenses)}>
					<div className={styles.titleAdd}>
						<Link to='/'>
							<FaArrowLeft />
						</Link>{' '}
						<p>Добавленные покупки</p>
					</div>
					{expenseList && expenseList.length > 0 ? (
						<>
							<div className={cn('slider-container', styles.slider)}>
								<Slider {...settings}>
									{expenseList.map(expense => (
										<ExpenseCard
											data={expense}
											key={expense.ID}
											clickHandler={() => {}}
										/>
									))}
								</Slider>
							</div>
						</>
					) : (
						<div>Здесь пока пусто</div>
					)}
				</div>
			</main>
		</Layout>
	)
}

export default ExpenseList
