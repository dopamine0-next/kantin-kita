import { InvoiceContainer } from '@/components/orders/invoice/invoice-container'

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  return <InvoiceContainer orderId={resolvedParams.id} />
}
