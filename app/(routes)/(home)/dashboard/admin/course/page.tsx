import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="container p-4">
      <div className="flex justify-end">
        <Link href="/dashboard/admin/course/category">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Category
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Page