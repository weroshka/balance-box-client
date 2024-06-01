import TableService from '/src/services/table.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useAddEntityFrom = ({ key }) => {
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
		}
	})

	const onSubmit = data => {
		// console.log(data)
		mutate(data)
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
