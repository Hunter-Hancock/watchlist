//pnpx supabase gen types typescript --project-id "fvzzuzaqwakxqsspshbh" --schema public > types/supabase.ts
import { Database as DB } from "@/types/supabase";

declare global {
  type Database = DB;
}
