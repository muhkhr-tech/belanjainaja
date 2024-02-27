CREATE TABLE IF NOT EXISTS "ddd_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"total_todos" integer DEFAULT 0 NOT NULL,
	"total_todos_inprogress" integer DEFAULT 0 NOT NULL,
	"total_todos_completed" integer DEFAULT 0 NOT NULL,
	"due_date" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_email" text NOT NULL,
	CONSTRAINT "ddd_projects_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ddd_todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"status" text NOT NULL,
	"project_id" integer NOT NULL,
	"user_email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ddd_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
ALTER TABLE "ba_balance_charts" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ba_deposits" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ba_items" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ba_item_types" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ba_shoppings" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ba_wallet" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ba_withdraws" ADD COLUMN "user_email" text NOT NULL;