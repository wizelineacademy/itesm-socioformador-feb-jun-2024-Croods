"use server";

import { getUserId, logSearch } from "../../../db/insertActions";
import { cookies } from "next/headers";
import {
  ORIGINAL_SEARCH_VALUES_KEY,
  SEARCH_VALUES_KEY,
  CURRENT_QUERY_KEY,
  ORIGINAL_CATEGORIES_KEY,
  CATEGORIES_KEY,
} from "../const/cookies";

import { getSearchObjects, getCategories, setCookie } from "../helper/cookies";
