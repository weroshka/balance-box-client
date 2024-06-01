import TableService from '/src/services/table.service'
import { useQuery } from '@tanstack/react-query'

export const useTableField = ({ key }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['tableField'],
		queryFn: () => TableService.getByKey(key)
	})

	return {
		table: data,
		isTableLoading: isLoading
	}
}
