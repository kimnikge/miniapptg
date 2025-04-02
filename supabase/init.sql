-- Создаем enum типы
CREATE TYPE user_role AS ENUM ('admin', 'worker', 'employer');
CREATE TYPE portfolio_status AS ENUM ('pending', 'active', 'closed');

-- Таблица пользователей
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    telegram_id TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'worker',
    nickname TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица портфолио
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    skills TEXT,
    city TEXT NOT NULL,
    status portfolio_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица подписок
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    city TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, city)
);

-- RLS политики
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Политики для users
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Политики для portfolios
CREATE POLICY "Users can manage own portfolios" ON portfolios
    FOR ALL USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Политики для subscriptions
CREATE POLICY "Users can manage own subscriptions" ON subscriptions
    FOR ALL USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    ));
