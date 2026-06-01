'use client'

import ReactMarkdown from 'react-markdown'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import remarkGfm from 'remark-gfm'

import { Skeleton } from '@/components/ui/skeleton'
import { useTerms } from '@/hooks/use-terms'

export function TermsContainer() {
  const router = useRouter()
  const { terms, isLoading } = useTerms()

  return (
    <div className="bg-background flex flex-1 flex-col">
      {/* Header */}
      <div className="bg-background/80 sticky top-0 z-10 flex items-center gap-4 px-4 py-4 backdrop-blur-md">
        <button
          onClick={() => router.back()}
          className="border-muted/20 bg-card hover:bg-muted/10 flex size-10 items-center justify-center rounded-full border"
        >
          <ChevronLeft className="text-foreground size-6" />
        </button>
        <h1 className="text-foreground text-lg font-black tracking-tight">Ketentuan Layanan</h1>
      </div>

      <div className="px-5 py-2">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : terms ? (
          <article className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{terms.content}</ReactMarkdown>
          </article>
        ) : (
          <div className="text-muted-foreground py-20 text-center text-sm">
            Ketentuan tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  )
}
