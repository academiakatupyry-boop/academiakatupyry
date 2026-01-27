-- Add 'gran_maestro' to the subscription_level enum
-- Postgres enums are immutable by default in some contexts, but Supabase allows adding values.
-- If this fails, we might need to recreate the type, but ALTER TYPE ADD VALUE is standard.

ALTER TYPE subscription_level ADD VALUE IF NOT EXISTS 'gran_maestro';

-- Optional: Verify it worked
-- SELECT enum_range(NULL::subscription_level);
