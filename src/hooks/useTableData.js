import TableService from '/src/services/table.service'
import { useQuery } from '@tanstack/react-query'

export const useTableData = ({ key }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['tableData'],
		queryFn: () => TableService.getData(key)
	})

	return {
		tableData: data,
		isTableDataLoading: isLoading
	}
}
