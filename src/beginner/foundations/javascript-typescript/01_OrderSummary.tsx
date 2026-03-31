import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Customer {
  id: string
  name: string
  email: string
  isPremium: boolean
}

interface OrderItem {
  id: string
  title: string
  quantity: number
  price: number
}

interface OrderSummaryProps {
  customer: Customer
  items: OrderItem[]
  couponCode?: string
}

const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`

const OrderSummary = ({
  customer,
  items,
  couponCode,
}: OrderSummaryProps): React.JSX.Element => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const discount = customer.isPremium ? subtotal * 0.1 : 0
  const couponDiscount = couponCode ? 15 : 0
  const tax = (subtotal - discount - couponDiscount) * 0.08
  const total = subtotal - discount - couponDiscount + tax

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.heading}>Order Summary</Text>
        <Text style={styles.customerName}>{customer.name}</Text>
        <Text style={styles.customerEmail}>{customer.email}</Text>

        <View style={styles.badgeRow}>
          <View
            style={[
              styles.badge,
              customer.isPremium ? styles.premiumBadge : styles.regularBadge,
            ]}>
            <Text style={styles.badgeText}>
              {customer.isPremium ? 'Premium customer' : 'Regular customer'}
            </Text>
          </View>
          {couponCode ? (
            <View style={styles.couponBadge}>
              <Text style={styles.badgeText}>Coupon: {couponCode}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          {items.map(({ id, title, price, quantity }) => (
            <View key={id} style={styles.itemRow}>
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
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items</Text>
            <Text style={styles.summaryValue}>{itemCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Premium discount</Text>
            <Text style={styles.summaryValue}>-{formatCurrency(discount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Coupon discount</Text>
            <Text style={styles.summaryValue}>
              -{formatCurrency(couponDiscount)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Place order</Text>
        </Pressable>
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  customerName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  customerEmail: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  premiumBadge: {
    backgroundColor: '#D1FAE5',
  },
  regularBadge: {
    backgroundColor: '#E5E7EB',
  },
  couponBadge: {
    borderRadius: 999,
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '600',
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
    color: '#111827',
  },
  itemMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  summaryBox: {
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#475569',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0B8F55',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
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
