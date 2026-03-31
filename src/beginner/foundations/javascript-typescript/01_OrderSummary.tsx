import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {
  FoundationCard,
  Pill,
  PrimaryButton,
  SectionHeader,
} from '../shared/ui'
import { foundationTheme } from '../shared/theme'

export interface Customer {
  id: string
  name: string
  email: string
  isPremium: boolean
}

export interface OrderItem {
  id: string
  title: string
  quantity: number
  price: number
}

interface OrderSummaryProps {
  customer: Customer
  items: ReadonlyArray<OrderItem>
  couponCode?: string
}

const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`

const getOrderPricing = (
  customer: Customer,
  items: ReadonlyArray<OrderItem>,
  couponCode?: string,
) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const premiumDiscount = customer.isPremium ? subtotal * 0.1 : 0
  const couponDiscount = couponCode ? 15 : 0
  const taxableAmount = Math.max(subtotal - premiumDiscount - couponDiscount, 0)
  const tax = taxableAmount * 0.08
  const total = taxableAmount + tax

  return {
    itemCount,
    subtotal,
    premiumDiscount,
    couponDiscount,
    tax,
    total,
  }
}

interface SummaryRowProps {
  label: string
  value: string
  emphasize?: boolean
}

function SummaryRow({
  label,
  value,
  emphasize = false,
}: SummaryRowProps): React.JSX.Element {
  return (
    <View style={[styles.summaryRow, emphasize && styles.totalRow]}>
      <Text style={[styles.summaryLabel, emphasize && styles.totalLabel]}>
        {label}
      </Text>
      <Text style={[styles.summaryValue, emphasize && styles.totalValue]}>
        {value}
      </Text>
    </View>
  )
}

const OrderSummary = ({
  customer,
  items,
  couponCode,
}: OrderSummaryProps): React.JSX.Element => {
  const pricing = getOrderPricing(customer, items, couponCode)

  return (
    <View style={styles.screen}>
      <FoundationCard>
        <SectionHeader
          title="Order Summary"
          subtitle="An industry-style example with typed domain models, pure pricing logic, reusable UI primitives, and clear separation between data and presentation."
        />
        <Text style={styles.customerName}>{customer.name}</Text>
        <Text style={styles.customerEmail}>{customer.email}</Text>

        <View style={styles.badgeRow}>
          <Pill
            label={customer.isPremium ? 'Premium customer' : 'Regular customer'}
            tone={customer.isPremium ? 'success' : 'neutral'}
          />
          {couponCode ? (
            <Pill label={`Coupon: ${couponCode}`} tone="info" />
          ) : null}
        </View>

        <View style={styles.section}>
          {items.map(({ id, title, price, quantity }) => (
            <View
              key={id}
              style={styles.itemRow}
              accessible
              accessibilityLabel={`${title}, quantity ${quantity}, line total ${formatCurrency(price * quantity)}`}>
              <View>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemMeta}>
                  {quantity} x {formatCurrency(price)}
                </Text>
              </View>
              <Text style={styles.itemPrice}>
                {formatCurrency(price * quantity)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryBox}>
          <SummaryRow label="Items" value={`${pricing.itemCount}`} />
          <SummaryRow
            label="Subtotal"
            value={formatCurrency(pricing.subtotal)}
          />
          <SummaryRow
            label="Premium discount"
            value={`-${formatCurrency(pricing.premiumDiscount)}`}
          />
          <SummaryRow
            label="Coupon discount"
            value={`-${formatCurrency(pricing.couponDiscount)}`}
          />
          <SummaryRow label="Tax" value={formatCurrency(pricing.tax)} />
          <SummaryRow
            label="Total"
            value={formatCurrency(pricing.total)}
            emphasize
          />
        </View>

        <PrimaryButton
          label="Place order"
          accessibilityLabel="Place order for this cart"
        />
      </FoundationCard>
    </View>
  )
}

export const sampleCustomer: Customer = {
  id: 'customer-101',
  name: 'Ava Mitchell',
  email: 'ava@shoplane.com',
  isPremium: true,
}

export const sampleItems: OrderItem[] = [
  { id: 'item-1', title: 'Wireless Mouse', quantity: 1, price: 29.99 },
  { id: 'item-2', title: 'Laptop Stand', quantity: 1, price: 44.5 },
  { id: 'item-3', title: 'USB-C Hub', quantity: 2, price: 18.75 },
]

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    padding: 20,
    justifyContent: 'center',
  },
  customerName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: foundationTheme.colors.textPrimary,
  },
  customerEmail: {
    marginTop: 4,
    fontSize: 14,
    color: foundationTheme.colors.textMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  section: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: foundationTheme.colors.textPrimary,
  },
  itemMeta: {
    marginTop: 4,
    fontSize: 13,
    color: foundationTheme.colors.textMuted,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: foundationTheme.colors.textPrimary,
  },
  summaryBox: {
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: foundationTheme.colors.surfaceMuted,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: foundationTheme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: foundationTheme.colors.textPrimary,
  },
  totalRow: {
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: foundationTheme.colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: foundationTheme.colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: foundationTheme.colors.success,
  },
})

export default function OrderSummaryExample() {
  return (
    <OrderSummary
      customer={sampleCustomer}
      items={sampleItems}
      couponCode="SAVE15"
    />
  )
}
