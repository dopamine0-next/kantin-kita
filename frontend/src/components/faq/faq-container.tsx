'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useFAQs } from '@/hooks/use-faqs'
import { Skeleton } from '@/components/ui/skeleton'

export function FAQContainer() {
  const router = useRouter()
  const { faqs, isLoading } = useFAQs()

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-background/80 px-4 py-4 backdrop-blur-md">
        <button
          onClick={() => router.back()}
          className="flex size-10 items-center justify-center rounded-full border border-muted/20 bg-card hover:bg-muted/10"
        >
          <ChevronLeft className="size-6 text-foreground" />
        </button>
        <h1 className="text-lg font-black tracking-tight text-foreground">Pertanyaan Populer</h1>
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
                <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
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
