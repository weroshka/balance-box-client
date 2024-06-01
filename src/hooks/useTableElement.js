import TableService from '/src/services/table.service'
import { useQuery } from '@tanstack/react-query'

export const useTableElement = ({ id, key }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['tableElement'],
		queryFn: () => TableService.getElement(key, id)
	})

	return {
		tableElement: data,
		isTableElementLoading: isLoading
	}
}
