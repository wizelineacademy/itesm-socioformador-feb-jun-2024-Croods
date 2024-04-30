// import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { eq } from "drizzle-orm";
import { Resource } from "sst";
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import postgres from "postgres";

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { User, user, login_log, search_log, error_log} from "./schema";

export async function getUserId({ newEmail }: { newEmail: string }) {
  const sql = neon(process.env.DB_URL!);
  const db = drizzle(sql);

  // const db = drizzle(new RDSDataClient({}), {
  //   database: Resource.KnowXDB.database,
  //   secretArn: Resource.KnowXDB.secretArn,
  //   resourceArn: Resource.KnowXDB.clusterArn
  // });

  let recent = await db.select().from(user).where(eq(user.email, newEmail));
  return recent[0].id;
}

export async function handleLogin({ profile }: any) {
  try {

    const sql = neon(process.env.DB_URL!);
    const db = drizzle(sql);

    // const db = drizzle(new RDSDataClient({}), {
    //   database: Resource.KnowXDB.database,
    //   secretArn: Resource.KnowXDB.secretArn,
    //   resourceArn: Resource.KnowXDB.clusterArn
    // });

    const uniqueUser: User[] = await db
      .select()
      .from(user)
      .where(eq(user.email, profile.email));

    if (uniqueUser.length === 0) {
      const newUser = await db
        .insert(user)
        .values({
          email: profile.email,
          region: "MX",
          createdAt: new Date().toISOString(),
        })
        .returning();

      await db.insert(login_log).values({
        idUser: newUser[0].id,
        accessDate: new Date(),
      });
    } else {
      await db.insert(login_log).values({
        idUser: uniqueUser[0].id,
        accessDate: new Date(),
      });
    }

    return true;
  } catch (error) {
    console.log("Error in handleLogin: ", error);

    await logError({
      userId: -1,
      description: String(error),
      origin: "handleLogin",
    });
    // return false;
    return true;
  }
}

export async function logSearch({
  userId,
  search,
  feedback,
}: {
  userId: number;
  search: string;
  feedback: boolean;
}) {
  try {
    const sql = neon(process.env.DB_URL!);
    const db = drizzle(sql);

    // const db = drizzle(new RDSDataClient({}), {
    //   database: Resource.KnowXDB.database,
    //   secretArn: Resource.KnowXDB.secretArn,
    //   resourceArn: Resource.KnowXDB.clusterArn
    // });
    
    await db.insert(search_log).values({
      idUser: userId,
      search,
      timeOfSearch: new Date(),
      feedback,
    });
  } catch (error) {
    await logError({ userId, description: String(error), origin: "logSearch" });
  }
}

async function logError({
  userId,
  description,
  origin,
}: {
  userId: number;
  description: string;
  origin: string;
}) {
  const sql = neon(process.env.DB_URL!);
  const db = drizzle(sql);

  // const db = drizzle(new RDSDataClient({}), {
  //   database: Resource.KnowXDB.database,
  //   secretArn: Resource.KnowXDB.secretArn,
  //   resourceArn: Resource.KnowXDB.clusterArn
  // });

  await db.insert(error_log).values({
    idUser: userId,
    description,
    errorTime: new Date(),
    origin,
  });
}
