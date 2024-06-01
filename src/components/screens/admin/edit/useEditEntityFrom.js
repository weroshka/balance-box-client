import TableService from '/src/services/table.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTableElement } from '/src/hooks/useTableElement'

export const useEditEntityFrom = ({ key, id }) => {
	const [isBegin, setIsBegin] = useState(true)
	const { tableElement, isTableElementLoading } = useTableElement({
		id: id,
		key: key
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		mode: 'onChange'
	})

	if (isBegin && tableElement) {
		reset(tableElement)
		setIsBegin(false)
	}

	const { mutate, isLoading } = useMutation({
		queryKey: ['editEntityAdmin'],
		mutationFn: params => TableService.updateEntity(key, id, params),
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
			isEddLoading: isLoading && isTableElementLoading,
			onSubmit
		}),
		[errors, isLoading, isTableElementLoading]
	)
}
