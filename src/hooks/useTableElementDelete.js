import TableService from '/src/services/table.service'
import { useMutation } from '@tanstack/react-query'

export const useTableElementDelete = ({ id, key }) => {
	const { mutate, isLoading } = useMutation({
		queryKey: ['tableElementDelete'],
		mutationFn: () => TableService.deleteElement(key, id),
		onSuccess: () => {
			document.location = `/admin/list/${key}`
		},
		onError: e => {
			console.log(e)
		}
	})

	return {
		deleteMutate: mutate,
		isDeleteMutateLoading: isLoading
	}
}
