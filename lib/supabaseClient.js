import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bastbpbzixisoikiqfee.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhc3RicGJ6aXhpc29pa2lxZmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzMwNTUsImV4cCI6MjA5MDY0OTA1NX0.XRXlhucdWzVj1iX7V11bI6-lICJUlYyLbTqOfe-VtA8'

export const supabase = createClient(supabaseUrl, supabaseKey)