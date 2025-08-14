import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Quote } from "./store/types";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11 },
  h1: { fontSize: 18, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  table: { marginTop: 12 },
  th: { fontSize: 10, marginBottom: 4 },
  td: { marginBottom: 2 }
});

export function QuotePDF({ quote }: { quote: Quote }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>NRG Window Quote</Text>
        <View style={{ marginBottom: 8 }}>
          <Text>Quote ID: {quote.id}</Text>
          <Text>Date: {new Date(quote.createdAt).toLocaleString()}</Text>
          <Text>Customer: {quote.customer.name}{quote.customer.email ? ` — ${quote.customer.email}` : ""}</Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.th}>Items</Text>
          {quote.items.map((it, i) => (
            <View key={i} style={styles.row}>
              <Text>{it.qty}× {it.window_type} {it.size} — {it.exterior_color}/{it.interior_color} {(it.grid_profile !== "none") ? `• ${it.grid_pattern}` : ""} {(it.glazing === "triple") ? "• Triple" : "• Dual"}</Text>
              <Text>${it.line_total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 12 }}>
          <View style={styles.row}><Text>Subtotal</Text><Text>${quote.subtotal.toFixed(2)}</Text></View>
          <View style={styles.row}><Text>Total</Text><Text>${quote.total.toFixed(2)}</Text></View>
        </View>
      </Page>
    </Document>
  );
}
