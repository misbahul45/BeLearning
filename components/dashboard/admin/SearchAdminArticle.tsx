'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ListOrdered, Search } from "lucide-react"
import { parseAsString, useQueryState } from 'nuqs'

const orderByLabels = {
  DESC: 'Date (Newest First)',
  ASC: 'Date (Oldest First)',
  VIEWS: 'View Count',
  SAVES: 'Save Count',
  COMMENTS: 'Comments'
}

const SearchAdminArticle = () => {
  const [search, setSearch] = useQueryState('article', parseAsString.withDefault('').withOptions({ shallow: false }))
  const [orderBy, setOrderBy] = useQueryState('orderBy', parseAsString.withDefault('').withOptions({ shallow: false }))

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
        <Input 
          type="text"  
          className="pl-8" 
          onChange={(e) => setSearch(e.target.value)} 
          value={search ?? ''} 
          placeholder="Search articles..." 
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="flex items-center gap-2 min-w-32">
              {orderBy ? (
              <span>Order By: {orderByLabels[orderBy as keyof typeof orderByLabels]}</span>
              ) : (
                <>
                  <ListOrdered className="h-4 w-4" />
                  <span>Order By</span>
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort Articles By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(orderByLabels).map(([value, label]) => (
              <DropdownMenuItem 
                key={value}
                onClick={() => setOrderBy(value)}
                className="cursor-pointer"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default SearchAdminArticle