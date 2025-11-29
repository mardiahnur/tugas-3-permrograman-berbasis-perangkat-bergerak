<template>
  <ion-item>
    <ion-label>
      <h2>#{{ coin.rank }} — {{ coin.name }} ({{ coin.symbol }})</h2>
      <p>Price (USD): {{ coin.price_usd }}</p>
    </ion-label>
  </ion-item>
</template>

<script setup>
import { IonItem, IonLabel } from '@ionic/vue';
import { defineProps } from 'vue';

defineProps({
  coin: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
h2 {
  font-weight: 600;
  margin-bottom: 4px;
}
p {
  margin: 0;
  color: #666;
}
</style>
