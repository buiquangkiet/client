import React from 'react'
import { memo } from 'react'

const Purchases = () => {
  return (
    <div className="container mx-auto p-4 text-left ">
      <div className="font-semibold text-[20px] my-5 mb-8">
        My Purchases
      </div>
    </div>
  )
}

export default memo(Purchases)
