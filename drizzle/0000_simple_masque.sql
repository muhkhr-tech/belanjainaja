CREATE TABLE IF NOT EXISTS "ba_balance_charts" (
	"id" serial PRIMARY KEY NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"balance" integer NOT NULL,
	"income" integer NOT NULL,
	"expenditure" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_deposits" (
	"id" serial PRIMARY KEY NOT NULL,
	"saved_on" date NOT NULL,
	"amount" integer NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"type_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ba_items_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_item_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ba_item_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_shoppings" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"purchase_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ba_shoppings_description_unique" UNIQUE("description")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_shopping_items" (
	"item_id" integer NOT NULL,
	"shopping_id" integer NOT NULL,
	"amount" integer,
	"price" integer,
	"unit" text,
	"total_price" integer,
	CONSTRAINT "ba_shopping_items_item_id_shopping_id_pk" PRIMARY KEY("item_id","shopping_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_wallet" (
	"id" serial PRIMARY KEY NOT NULL,
	"income" integer NOT NULL,
	"expenditure" integer NOT NULL,
	"balance" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ba_withdraws" (
	"id" serial PRIMARY KEY NOT NULL,
	"pulled_on" date NOT NULL,
	"amount" integer NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ba_items" ADD CONSTRAINT "ba_items_type_id_ba_item_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "ba_item_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ba_shopping_items" ADD CONSTRAINT "ba_shopping_items_item_id_ba_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "ba_items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ba_shopping_items" ADD CONSTRAINT "ba_shopping_items_shopping_id_ba_shoppings_id_fk" FOREIGN KEY ("shopping_id") REFERENCES "ba_shoppings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
