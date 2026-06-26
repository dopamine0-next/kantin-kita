'use client'

import { PanInfo, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { BannerItem as BannerItemType } from '@/services/banner/banner.types'

interface BannerCardProps {
  item: BannerItemType
  index: number
  activeIndex: number
  totalItems: number
  onDragEnd: (event: unknown, info: PanInfo) => void
}

export function BannerCard({ item, index, activeIndex, totalItems, onDragEnd }: BannerCardProps) {
  // Calculate relative position (offset)
  let offset = index - activeIndex

  // Wrap around for circular logic
  if (offset > totalItems / 2) offset -= totalItems
  if (offset < -totalItems / 2) offset += totalItems

  // Determine visual properties based on offset
  const isActive = offset === 0
  const isVisible = Math.abs(offset) <= 1

  // Set variants for motion
  const variants = {
    active: {
      x: 0,
      scale: 1,
      zIndex: 10,
      opacity: 1,
      rotateY: 0,
    },
    side: (dir: number) => ({
      x: dir * 45, // Slight shift to sides
      scale: 0.9,
      zIndex: 5,
      opacity: 0.6,
      rotateY: dir * -15, // Perspective effect
    }),
    hidden: (dir: number) => ({
      x: dir * 100,
      scale: 0.8,
      zIndex: 0,
      opacity: 0,
      rotateY: 0,
    }),
  }

  return (
    <motion.div
      className="absolute h-44 w-[90%] cursor-grab active:cursor-grabbing"
      initial={false}
      animate={isActive ? 'active' : isVisible ? 'side' : 'hidden'}
      custom={offset > 0 ? 1 : -1}
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 25,
      }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      style={{
        transformPerspective: 1000,
      }}
    >
      <Link
        href={item.linkUrl}
        className="relative block size-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="90vw"
          className="object-cover object-center transition-transform duration-700 active:scale-105"
        />
      </Link>
    </motion.div>
  )
}
