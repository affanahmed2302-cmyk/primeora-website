const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL,
});

async function main() {
  if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
    console.log('Skipping team DB sync: DATABASE_URL not set in environment.');
    return;
  }

  await client.connect();
  console.log('Connected to Supabase PostgreSQL database.');

  // 1. Affan Ahmed Shariff
  await client.query(`
    UPDATE team_members SET
      full_name = 'Affan Ahmed Shariff',
      public_title = 'Founder, Business Development',
      department = 'Commercial & Partnerships',
      bio = 'Leads client acquisition, strategic partnerships, revenue strategy, and enterprise client relationships. Affan works closely with business owners to identify digital bottlenecks and structure high-impact project engagements.',
      photo_url = '/team/affan-ahmed-shariff.jpg',
      linkedin_url = 'https://www.linkedin.com/in/affan-ahmed-shariff',
      portfolio_url = 'https://affanahmed2302-cmyk.github.io/',
      responsibilities = ARRAY['Client acquisition & relationship management', 'Strategic commercial partnerships', 'Revenue growth and service scoping', 'Qualified project enquiry consultations'],
      display_order = 1,
      status = 'published',
      updated_at = NOW()
    WHERE id = 'a0000000-0000-0000-0000-000000000001';
  `);

  // 2. Akarsh P. Thodaskar
  await client.query(`
    UPDATE team_members SET
      full_name = 'Akarsh P. Thodaskar',
      public_title = 'Founder, Technology & Development',
      department = 'Engineering & Architecture',
      bio = 'Oversees technical architecture, software engineering, third-party API integrations, and cloud infrastructure. Akarsh ensures every website, CRM flow, and automation is engineered with clean code, high security, and high reliability.',
      photo_url = NULL,
      linkedin_url = 'https://www.linkedin.com/in/akarsh-p-6963b5397?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      portfolio_url = NULL,
      responsibilities = ARRAY['Full-stack software engineering', 'API integrations & automation backend', 'Performance optimization & security auditing', 'Continuous deployment & cloud infrastructure'],
      display_order = 2,
      status = 'published',
      updated_at = NOW()
    WHERE id = 'a0000000-0000-0000-0000-000000000002';
  `);

  // 3. Dhananjaya G.R.
  await client.query(`
    UPDATE team_members SET
      full_name = 'Dhananjaya G.R.',
      public_title = 'Founder, Business Strategy & Systems',
      department = 'Strategy & Operations',
      bio = 'Leads business systems architecture, workflow analysis, conversion rate strategy, and client operations. Dhananjaya bridges commercial strategy with technical execution to turn fragmented operations into cohesive digital systems.',
      photo_url = NULL,
      linkedin_url = 'https://www.linkedin.com/in/dhananjaya-gr',
      portfolio_url = NULL,
      responsibilities = ARRAY['Business systems & operational workflow design', 'Analytics, reporting & conversion optimization', 'Process automation architecture', 'Strategy & operational delivery reviews'],
      display_order = 3,
      status = 'published',
      updated_at = NOW()
    WHERE id = 'a0000000-0000-0000-0000-000000000003';
  `);

  console.log('Successfully updated founder records in Supabase.');
  await client.end();
}

main().catch((err) => {
  console.error('Update failed:', err);
  process.exit(1);
});
