-- Create table to store visitor interactions for federated learning
CREATE TABLE IF NOT EXISTS public.federated_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL, -- 'hover', 'focus', 'scroll', 'dwell'
  element_id TEXT NOT NULL,
  duration INTEGER, -- milliseconds
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create table to store the evolving page state
CREATE TABLE IF NOT EXISTS public.federated_page_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version INTEGER NOT NULL DEFAULT 1,
  layout_weights JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_emphasis JSONB NOT NULL DEFAULT '{}'::jsonb,
  visual_parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT false
);

-- Enable RLS (though this data is meant to be aggregated and anonymous)
ALTER TABLE public.federated_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federated_page_state ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the current page state
CREATE POLICY "Allow read page state" ON public.federated_page_state
  FOR SELECT USING (is_active = true);

-- Allow anyone to insert interactions (anonymous)
CREATE POLICY "Allow insert interactions" ON public.federated_interactions
  FOR INSERT WITH CHECK (true);

-- Insert initial page state
INSERT INTO public.federated_page_state (
  layout_weights,
  content_emphasis,
  visual_parameters,
  is_active
) VALUES (
  '{"hero": 1.0, "concept": 1.0, "technical": 1.0, "philosophy": 1.0}',
  '{"privacy": 0.5, "collaboration": 0.5, "intelligence": 0.5, "distributed": 0.5}',
  '{"opacity": 0.8, "scale": 1.0, "blur": 0, "brightness": 1.0}',
  true
) ON CONFLICT DO NOTHING;
