CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "error_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"description" text,
	"errorTime" timestamp with time zone,
	"origin" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "login_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"accessDate" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "old_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"region" varchar(20),
	"createdAt" date,
	CONSTRAINT "old_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "search_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"idUser" integer,
	"search" varchar(128),
	"timeOfSearch" timestamp with time zone,
	"feedback" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "error_log" ADD CONSTRAINT "error_log_userId_old_user_id_fk" FOREIGN KEY ("userId") REFERENCES "old_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "login_log" ADD CONSTRAINT "login_log_userId_old_user_id_fk" FOREIGN KEY ("userId") REFERENCES "old_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "search_log" ADD CONSTRAINT "search_log_idUser_old_user_id_fk" FOREIGN KEY ("idUser") REFERENCES "old_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
