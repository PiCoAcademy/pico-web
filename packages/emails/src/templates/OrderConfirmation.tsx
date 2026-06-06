import * as React from 'react'
import {
  Html, Head, Body, Container, Heading, Text, Hr, Section, Row, Column,
} from '@react-email/components'

export interface OrderConfirmationProps {
  orderRef: string
  customerName: string
  items: { name: string; qty: number; unitPrice: number }[]
  totalMad: number
  shippingAddress: string
}

export function OrderConfirmation({
  orderRef,
  customerName,
  items,
  totalMad,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#030712', fontFamily: 'Inter, sans-serif', color: '#F1F5F9' }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
          <Heading style={{ fontSize: 24, fontWeight: 900, color: '#F1F5F9', margin: '0 0 8px' }}>
            PICO Store
          </Heading>
          <Text style={{ color: '#64748B', margin: '0 0 32px' }}>Confirmation de commande</Text>

          <Text style={{ fontSize: 16, margin: '0 0 4px' }}>
            Bonjour {customerName},
          </Text>
          <Text style={{ color: '#94A3B8', margin: '0 0 24px' }}>
            Votre commande <strong style={{ color: '#F1F5F9' }}>{orderRef}</strong> a bien été reçue.
          </Text>

          <Hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

          {items.map((item, i) => (
            <Row key={i} style={{ marginBottom: 12 }}>
              <Column>
                <Text style={{ margin: 0, color: '#F1F5F9' }}>{item.name} × {item.qty}</Text>
              </Column>
              <Column align="right">
                <Text style={{ margin: 0, color: '#10B981' }}>
                  {(item.unitPrice * item.qty).toFixed(2)} MAD
                </Text>
              </Column>
            </Row>
          ))}

          <Hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '24px 0' }} />

          <Row>
            <Column><Text style={{ margin: 0, fontWeight: 700 }}>Total</Text></Column>
            <Column align="right">
              <Text style={{ margin: 0, fontWeight: 700, color: '#10B981', fontSize: 18 }}>
                {totalMad.toFixed(2)} MAD
              </Text>
            </Column>
          </Row>

          <Section style={{ marginTop: 32, padding: '16px', backgroundColor: '#0D1117', borderRadius: 8 }}>
            <Text style={{ margin: 0, color: '#64748B', fontSize: 13 }}>Livraison à</Text>
            <Text style={{ margin: '4px 0 0', color: '#F1F5F9', fontSize: 14 }}>
              {shippingAddress}
            </Text>
          </Section>

          <Text style={{ color: '#64748B', fontSize: 12, marginTop: 40 }}>
            Des questions ? Contactez-nous à{' '}
            <a href="mailto:info@pico.ma" style={{ color: '#10B981' }}>info@pico.ma</a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default OrderConfirmation
