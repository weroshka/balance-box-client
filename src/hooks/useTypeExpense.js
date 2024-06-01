import ExpenseService from '/src/services/expense.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useTypeExpense = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['typeExpense'],
		queryFn: () => ExpenseService.getTypeList()
	})

	return useMemo(
		() => ({
			typeExpenseList: data,
			isTypeExpenseLoading: isLoading
		}),
		[isLoading]
	)
}
