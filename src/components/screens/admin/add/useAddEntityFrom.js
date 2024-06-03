import TableService from '/src/services/table.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useAddEntityFrom = ({ key, setErrorResponse }) => {
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
		queryKey: ['addEntityAdmin'],
		mutationFn: params => TableService.addEntity(key, params),
		onSuccess: () => {
			document.location = `/admin/list/${key}`
			reset()
		},
		onError: e => {
			console.log(e)
			setErrorResponse(e.message)
		}
	})

	const onSubmit = data => {
		let isEmpty = true
		Object.keys(data).forEach(key => {
			if (data[key] || false) isEmpty = false
		})
		if (!isEmpty) mutate(data)
		else setErrorResponse('Заполните все поля')
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
		[errors, isLoading]
	)
}
