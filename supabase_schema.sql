-- 1. Create a custom ENUM type for roles
CREATE TYPE public.user_role AS ENUM ('customer', 'admin');

-- 2. Create the profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role DEFAULT 'customer'::public.user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the piercing_bookings table
CREATE TABLE public.piercing_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create the engraving_orders table
CREATE TABLE public.engraving_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_details TEXT NOT NULL,
  engraving_text TEXT,
  image_url TEXT, -- Reference to Supabase Storage
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create the customer_uploads table
CREATE TABLE public.customer_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  purpose TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.piercing_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engraving_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_uploads ENABLE ROW LEVEL SECURITY;

-- 7. SET UP RLS POLICIES

-- Profiles: Users can read their own profile, Admins can read all
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Bookings: Customers can see/create their own, Admins can see all
CREATE POLICY "Customers can view their own bookings" ON public.piercing_bookings
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create their own bookings" ON public.piercing_bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Admins can view all bookings" ON public.piercing_bookings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Similar policies for engravings and uploads
CREATE POLICY "Customers can view their own engravings" ON public.engraving_orders
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create their own engravings" ON public.engraving_orders
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Admins can manage all engravings" ON public.engraving_orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 8. TRIGGER FOR AUTO-PROFILES
-- Automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
