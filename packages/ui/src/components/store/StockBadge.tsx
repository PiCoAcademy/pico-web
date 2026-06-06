import * as React from 'react'
import { Badge } from '../Badge'

export interface StockBadgeProps {
  qty: number
  lowAt?: number
}

export function StockBadge({ qty, lowAt = 5 }: StockBadgeProps) {
  if (qty <= 0) return <Badge variant="error">Épuisé</Badge>
  if (qty <= lowAt) return <Badge variant="warning">Stock limité — {qty} restants</Badge>
  return <Badge variant="success">En stock</Badge>
}
