const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dvhxcukgxgoptzprolfe.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY must be supplied in environment to run this provisioning script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const FOUNDERS = [
  {
    email: 'dhananjaya.noir@gmail.com',
    fullName: 'Dhananjaya G.R.',
    role: 'super_admin'
  },
  {
    email: 'affanahmed2302@gmail.com',
    fullName: 'Affan Ahmed Shariff',
    role: 'super_admin'
  },
  {
    email: 'akarshthodaskar@gmail.com',
    fullName: 'Akarsh P. Thodaskar',
    role: 'super_admin'
  }
];

async function main() {
  console.log('=== PROVISIONING FOUNDERS WITH SUPER_ADMIN ACCESS ===\n');

  const { data: existingUsersData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Failed to list existing auth users:', listError);
    process.exit(1);
  }

  const existingUsers = existingUsersData.users || [];
  const inviteLinks = [];

  for (const founder of FOUNDERS) {
    let user = existingUsers.find(u => u.email.toLowerCase() === founder.email.toLowerCase());

    if (!user) {
      console.log(`Creating auth user for ${founder.fullName} (${founder.email})...`);
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: founder.email,
        email_confirm: true,
        user_metadata: { full_name: founder.fullName }
      });

      if (createError) {
        console.error(`Failed to create user ${founder.email}:`, createError);
        continue;
      }
      user = newUser.user;
      console.log(`✓ Auth user created: ${user.id}`);
    } else {
      console.log(`Auth user already exists for ${founder.email}: ${user.id}`);
      // Ensure user metadata is updated
      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: { full_name: founder.fullName }
      });
    }

    // Ensure record in admin_profiles
    const { data: existingProfile } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      console.log(`Inserting admin_profile for ${founder.email} as ${founder.role}...`);
      const { error: insertErr } = await supabase.from('admin_profiles').insert({
        id: user.id,
        email: founder.email,
        full_name: founder.fullName,
        role: founder.role,
        updated_at: new Date().toISOString()
      });
      if (insertErr) console.error(`Failed to insert profile:`, insertErr);
      else console.log(`✓ Admin profile created with role ${founder.role}`);
    } else {
      console.log(`Updating admin_profile for ${founder.email} to ${founder.role}...`);
      const { error: updateErr } = await supabase.from('admin_profiles').update({
        full_name: founder.fullName,
        role: founder.role,
        updated_at: new Date().toISOString()
      }).eq('id', user.id);
      if (updateErr) console.error(`Failed to update profile:`, updateErr);
      else console.log(`✓ Admin profile updated with role ${founder.role}`);
    }

    // Generate individual secure setup/recovery link
    const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: founder.email,
      options: {
        redirectTo: 'https://primeora-solutions.netlify.app/admin/update-password'
      }
    });

    if (linkErr) {
      console.error(`Failed to generate link for ${founder.email}:`, linkErr);
    } else if (linkData?.properties?.action_link) {
      inviteLinks.push({
        founder: founder.fullName,
        email: founder.email,
        actionLink: linkData.properties.action_link
      });
    }
  }

  console.log('\n=== PROVISIONING SUMMARY ===');
  const { data: allProfiles } = await supabase.from('admin_profiles').select('*');
  console.log('Current Admin Profiles in Supabase:');
  console.table(allProfiles?.map(p => ({ id: p.id, email: p.email, full_name: p.full_name, role: p.role })));

  console.log('\nGenerated Secure Password Setup Links (Single-use, expires in 24 hours):');
  inviteLinks.forEach(item => {
    console.log(`\n• ${item.founder} (${item.email}):`);
    console.log(`  Setup URL: ${item.actionLink}`);
  });
}

main().catch(console.error);
