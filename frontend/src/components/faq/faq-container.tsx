'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { useFAQs } from '@/hooks/use-faqs'

export function FAQContainer() {
  const router = useRouter()
  const { faqs, isLoading } = useFAQs()

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
        <h1 className="text-foreground text-lg font-semibold">Pertanyaan Populer</h1>
      </div>

      <div className="px-4 py-2">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-muted/20">
                <AccordionTrigger className="text-foreground text-left text-sm font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  )
}
