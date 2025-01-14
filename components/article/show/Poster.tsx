'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Article, Cover } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import PosterLoader from "@/components/Loaders/PosterLoader"
import { User } from "next-auth"

type ArticleWithRelations = Partial<Article & { cover: Cover; author: User }> & {
  id?: string;
};
type Props = {
  articles: ArticleWithRelations[]
}

export function Poster({ articles }: Props) {
  const [isMounted, setIsMounted] = React.useState(false)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
        <PosterLoader />
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:mb-6 mb-4">
      <Carousel
        plugins={[plugin.current]}
        className="flex-1"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem key={article.slug}>
              <Link href={`/article/${article.slug}`} className="block relative w-full h-full">
                <div className="relative w-full h-[40vh] md:h-[65vh] rounded-lg overflow-hidden">
                  <Image
                    src={article?.cover?.url || '/api/placeholder/1200/800'}
                    alt={article?.title || 'Article image'}
                    width={1200}
                    height={800}
                    priority
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <div 
                      dangerouslySetInnerHTML={{ __html: article.content || '' }} 
                      className="text-sm md:text-base line-clamp-2 text-gray-200 [&>*]:text-gray-200"
                    />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="w-full md:w-80 border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-lg mb-4">Recent Articles</h3>
        <div className="space-y-4">
          {articles.slice(0, 2).map((article) => (
            <Link 
              key={article.slug}
              href={`/article/${article.slug}`}
              className="block group"
            >
              <div className="relative h-24 rounded-md overflow-hidden mb-2">
                <Image
                  src={article?.cover?.url || '/api/placeholder/320/200'}
                  alt={article?.title || 'Article thumbnail'}
                  width={320}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}