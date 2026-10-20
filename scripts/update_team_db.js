const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.dvhxcukgxgoptzprolfe:[REDACTED_PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres'
});

async function main() {
  await client.connect();
  console.log('Connected to Supabase PostgreSQL database.');

  // 1. Affan Ahmed Shariff
  await client.query(`
    UPDATE team_members SET
      full_name = 'Affan Ahmed Shariff',
      public_title = 'Founder, Business Development',
      department = 'Commercial & Partnerships',
      bio = 'Leads client acquisition, strategic partnerships, revenue strategy, and enterprise client relationships. Affan works closely with business owners to identify digital bottlenecks and structure high-impact project engagements.',
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
      bio = 'Guides enterprise business strategy, analytical models, operational workflow automation, and client proposals. Dhananjaya focuses on translating business goals into rigorous, measurable digital systems and operational efficiency.',
      linkedin_url = 'https://www.linkedin.com/in/dhananjaya-gr',
      portfolio_url = NULL,
      responsibilities = ARRAY['Business strategy & client proposals', 'Data analytics & intelligence dashboards', 'Workflow & operations automation architecture', 'Internal system optimization & QA standards'],
      display_order = 3,
      status = 'published',
      updated_at = NOW()
    WHERE id = 'a0000000-0000-0000-0000-000000000003';
  `);

  const res = await client.query('SELECT id, full_name, public_title, linkedin_url, portfolio_url, status FROM team_members ORDER BY display_order');
  console.log('Successfully updated team_members in DB:');
  console.table(res.rows);
  await client.end();
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
