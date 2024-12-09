export interface IBike {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric'; // Enum with exact values
  description: string;
  quantity: number;
  inStock: boolean;
}
