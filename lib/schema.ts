import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const User = pgTable(
  'ba_users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const ItemType = pgTable(
  'ba_item_types',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    isActive: boolean('is_active').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const ItemTypeRelations = relations(ItemType, ({ many }) => ({
  Item: many(Item),
}));

export const Item = pgTable(
  'ba_items',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    price: integer('price').notNull(),
    typeId: serial('type_id').notNull().references(() => ItemType.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const ItemtoTypeRelations = relations(Item, ({ one }) => ({
  type: one(ItemType, {
    fields: [Item.typeId],
    references: [ItemType.id],
  }),
}));

export const ItemRelations = relations(Item, ({ many }) => ({
  ShoppingItem: many(Shopping),
}));

export const Shopping = pgTable(
  'ba_shoppings',
  {
    id: serial('id').primaryKey(),
    description: text('description').notNull().unique(),
    purchaseDate: date('purchase_date').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const ShoppingRelations = relations(Shopping, ({ many }) => ({
  ShoppingItem: many(Item),
}));

export const ShoppingItem = pgTable('ba_shopping_items', {
  itemId: integer('item_id').notNull().references(() => Item.id),
  shoppingId: integer('shopping_id').notNull().references(() => Shopping.id),
  amount: integer('amount'),
  price: integer('price'),
  unit: text('unit'),
  totalPrice: integer('total_price')
}, (t) => ({
  pk: primaryKey(t.itemId, t.shoppingId),
})
);

export const Wallet = pgTable(
  'ba_wallet',
  {
    id: serial('id').primaryKey(),
    income: integer('income').notNull(),
    expenditure: integer('expenditure').notNull(),
    balance: integer('balance').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const Deposit = pgTable(
  'ba_deposits',
  {
    id: serial('id').primaryKey(),
    savedOn: date('saved_on').notNull(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const Withdraw = pgTable(
  'ba_withdraws',
  {
    id: serial('id').primaryKey(),
    pulledOn: date('pulled_on').notNull(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export const BalanceChart = pgTable(
  'ba_balance_charts',
  {
    id: serial('id').primaryKey(),
    month: integer('month').notNull(),
    year: integer('year').notNull(),
    balance: integer('balance').notNull(),
    income: integer('income').notNull(),
    expenditure: integer('expenditure').notNull(),
    // createdAt: timestamp('created_at').defaultNow().notNull(),
    // updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);