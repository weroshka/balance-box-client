import ExpenseService from '/src/services/expense.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useAddExpenseForm = ({
	staffId,
	userLoading,
	date,
	setErrorResponse
}) => {
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
			document.location = `/?s=Y`
			reset()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = data => {
		if (!data.typeExpenseId) {
			setErrorResponse('Выберите тип расхода')
			return
		}
		if (!data.groupId) {
			setErrorResponse('Выберите отдел')
			return
		}
		if (data.docs.length > 0 && data.docs[0].size > 5 * 1024 * 1024) {
			setErrorResponse('Превышено ограничение по размеру файла - 5 мб')
			return
		}

		const formData = new FormData()
		formData.append(
			'date',
			`${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}.${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}.${date.getFullYear()}`
		)
		formData.append('staffId', staffId)
		formData.append('groupId', data.groupId.value)
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
