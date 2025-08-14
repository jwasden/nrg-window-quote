import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11 },
  h1: { fontSize: 18, marginBottom: 12 },
  meta: { marginBottom: 12, color: '#444' },
  table: { width: '100%', borderTop: 1, borderLeft: 1, borderColor: '#ddd' },
  row: { flexDirection: 'row' },
  cell: { borderRight: 1, borderBottom: 1, borderColor: '#ddd', padding: 6, flexGrow: 1 },
  right: { textAlign: 'right' },
});

export type QuotePDFProps = {
  quote: any;
  items: any[];
  customer: any;
};

export default function QuoteDoc({ quote, items, customer }: QuotePDFProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>NRG Window Quote</Text>
        <Text style={styles.meta}>Quote ID: {quote.id} • Date: {new Date(quote.created_at).toLocaleDateString()}</Text>
        <Text style={styles.meta}>Customer: {customer?.name}{customer?.email ? ` • ${customer.email}` : ''}{customer?.phone ? ` • ${customer.phone}` : ''}</Text>

        <View style={[styles.table, { marginTop: 8 }]}>
          <View style={[styles.row, { backgroundColor: '#f7f7f7' }]}>
            <Text style={[styles.cell, { flexBasis: 80 }]}>Type</Text>
            <Text style={[styles.cell, { flexBasis: 50 }]}>Size</Text>
            <Text style={[styles.cell, { flexBasis: 40 }]}>Qty</Text>
            <Text style={[styles.cell, { flexGrow: 2 }]}>Options</Text>
            <Text style={[styles.cell, styles.right, { flexBasis: 70 }]}>Unit</Text>
            <Text style={[styles.cell, styles.right, { flexBasis: 80 }]}>Line Total</Text>
          </View>
          {items.map((it) => (
            <View key={it.id} style={styles.row}>
              <Text style={[styles.cell, { flexBasis: 80 }]}>{it.window_type}</Text>
              <Text style={[styles.cell, { flexBasis: 50 }]}>{it.size}</Text>
              <Text style={[styles.cell, { flexBasis: 40 }]}>{it.qty}</Text>
              <Text style={[styles.cell, { flexGrow: 2 }]}>
                {it.exterior_color}/{it.interior_color}; {it.glazing}; {it.grid_profile !== 'none' ? `${it.grid_pattern}, ` : ''}{it.obscure_glass !== 'None' ? `${it.obscure_glass}, ` : ''}{it.cavity_foam ? 'Foam' : ''}
              </Text>
              <Text style={[styles.cell, styles.right, { flexBasis: 70 }]}>${Number(it.unit_price).toFixed(2)}</Text>
              <Text style={[styles.cell, styles.right, { flexBasis: 80 }]}>${Number(it.line_total).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 10, alignSelf: 'flex-end', width: 250 }}>
          <View style={[styles.row]}>
            <Text style={[styles.cell, { flexGrow: 1 }]}>Subtotal</Text>
            <Text style={[styles.cell, styles.right, { flexBasis: 100 }]}>${Number(quote.subtotal).toFixed(2)}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cell, { flexGrow: 1, fontWeight: 700 }]}>Total</Text>
            <Text style={[styles.cell, styles.right, { flexBasis: 100, fontWeight: 700 }]}>${Number(quote.total).toFixed(2)}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 14, color: '#666' }}>Standard features include EdgeForce, Ocular, CoreFX, Defense‑Tek, Forecaster, HP3, and Gatekeeper.</Text>
      </Page>
    </Document>
  );
}