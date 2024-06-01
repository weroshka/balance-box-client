import ExpenseService from '/src/services/expense.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useExpense = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['expense'],
		queryFn: () => ExpenseService.getCurrentList()
	})

	return useMemo(
		() => ({
			expenseList: data,
			isExpenseIsLoading: isLoading
		}),
		[isLoading]
	)
}
