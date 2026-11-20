-- Create the tws_sample_audit table inside the business_audit schema
CREATE SCHEMA IF NOT EXISTS business_audit;

CREATE TABLE IF NOT EXISTS business_audit.tws_sample_audit (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(150) UNIQUE,
    audit_type VARCHAR(50) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    whatsapp_number VARCHAR(50),
    auditor_name VARCHAR(150),
    auditor_phone VARCHAR(50),
    category VARCHAR(150),
    locality VARCHAR(255),
    age VARCHAR(20),
    biological_sex VARCHAR(20),
    total_score INTEGER NOT NULL,
    max_score INTEGER DEFAULT 100 NOT NULL,
    percentage INTEGER DEFAULT 0 NOT NULL,
    band_title VARCHAR(150) NOT NULL,
    band_headline TEXT,
    sprint_recommendation VARCHAR(255),
    section_scores JSONB NOT NULL,
    answers JSONB NOT NULL,
    findings JSONB NOT NULL,
    profile_details JSONB NOT NULL,
    payload TEXT,
    view_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_tws_sample_audit_type ON business_audit.tws_sample_audit (audit_type);
CREATE INDEX IF NOT EXISTS idx_tws_sample_audit_client ON business_audit.tws_sample_audit (client_name);
CREATE INDEX IF NOT EXISTS idx_tws_sample_audit_whatsapp ON business_audit.tws_sample_audit (whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_tws_sample_audit_auditor ON business_audit.tws_sample_audit (auditor_name);
CREATE INDEX IF NOT EXISTS idx_tws_sample_audit_created ON business_audit.tws_sample_audit (created_at DESC);
