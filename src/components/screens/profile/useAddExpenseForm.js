import ExpenseService from '/src/services/expense.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useAddExpenseForm = ({ staffId, userLoading, date }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		mode: 'onChange'
	})

	const { mutate, isLoading } = useMutation({
		queryKey: ['addExpense'],
		mutationFn: params => ExpenseService.add(params),
		onSuccess: () => {
			document.location.reload()
			reset()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = data => {
		const formData = new FormData()
		formData.append(
			'date',
			`${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}.${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}.${date.getFullYear()}`
		)
		formData.append('staffId', staffId)
		formData.append('typeExpenseId', data.typeExpenseId.value)
		formData.append('cost', data.cost)
		formData.append('docs', data.docs[0])

		mutate(formData)
	}

	return useMemo(
		() => ({
			register,
			control,
			handleSubmit,
			errors,
			isAddLoading: isLoading,
			onSubmit
		}),
		[errors, isLoading, userLoading, date]
	)
}
