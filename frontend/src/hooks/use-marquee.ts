import useSWR from 'swr'

import { getMarqueeItems } from '@/services/marquee/marquee.service'

export function useMarquee() {
  const { data, error, isLoading } = useSWR('marquee', getMarqueeItems)

  return {
    marqueeItems: data || [],
    error,
    isLoading,
  }
}
