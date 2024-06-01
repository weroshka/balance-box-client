import staffService from '/src/services/staff.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['staffOnly'],
		queryFn: () => staffService.getUser()
	})

	return useMemo(
		() => ({
			user: data,
			isLoading
		}),
		[isLoading]
	)
}
