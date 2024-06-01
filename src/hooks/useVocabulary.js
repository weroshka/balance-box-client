import VocabularyService from '/src/services/vocabulary.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useVocabulary = ({ key }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['vocabulary'],
		queryFn: () => VocabularyService.getByKey(key)
	})

	return useMemo(
		() => ({
			vocabularyList: data,
			isVocabularyLoading: isLoading
		}),
		[isLoading, key]
	)
}
