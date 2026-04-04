import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://awtrtaqwqsjuuszqjdon.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dHJ0YXF3cXNqdXVzenFqZG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzExMDUsImV4cCI6MjA4ODYwNzEwNX0.pSUrTjR3iSUoL6PBan0F8LGSxUh7jojohp0VnGeKgLk"
);
