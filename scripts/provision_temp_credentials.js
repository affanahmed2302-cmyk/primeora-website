/**
 * PRIMEORA SOLUTIONS — OPERATOR TEMPORARY CREDENTIAL PROVISIONING
 * 
 * Generates unique, high-entropy 24-hour temporary credentials for verified founders.
 * Sets must_change_password = true and temp_password_expires_at in admin_profiles.
 * 
 * Usage:
 *   $env:SUPABASE_SERVICE_ROLE_KEY="..."; node scripts/provision_temp_credentials.js
 * 
 * SECURITY: Passwords are output ONLY to this local terminal session.
 * Never commit this output, write to logs, or store in shared reports.
 */

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dvhxcukgxgoptzprolfe.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is required.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const FOUNDERS = [
  {
    fullName: 'Dhananjaya G.R.',
    email: 'dhananjaya.noir@gmail.com',
    role: 'super_admin'
  },
  {
    fullName: 'Affan Ahmed Shariff',
    email: 'affanahmed2302@gmail.com',
    role: 'super_admin'
  },
  {
    fullName: 'Akarsh P. Thodaskar',
    email: 'akarshthodaskar@gmail.com',
    role: 'super_admin'
  }
];

function generateSecureTempPassword() {
  // 16 chars: uppercase, lowercase, numbers, special symbol
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  const bytes = crypto.randomBytes(16);
  let pass = '';
  for (let i = 0; i < 16; i++) {
    pass += chars[bytes[i] % chars.length];
  }
  // Ensure at least one uppercase, lowercase, number, symbol
  return pass + 'A1!';
}

async function main() {
  console.log('====================================================================');
  console.log('  PRIMEORA SOLUTIONS — FOUNDER TEMPORARY CREDENTIAL GENERATOR       ');
  console.log('====================================================================\n');

  const { data: usersData, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) {
    console.error('Failed to query users:', listErr);
    process.exit(1);
  }

  const existingUsers = usersData.users || [];
  const credentialsToDeliver = [];
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  for (const founder of FOUNDERS) {
    const user = existingUsers.find(u => u.email.toLowerCase() === founder.email.toLowerCase());

    if (!user) {
      console.error(`User record for ${founder.email} not found in Supabase Auth.`);
      continue;
    }

    const tempPassword = generateSecureTempPassword();

    // 1. Update Supabase Auth user password
    const { error: updateAuthErr } = await supabase.auth.admin.updateUserById(user.id, {
      password: tempPassword
    });

    if (updateAuthErr) {
      console.error(`Failed to set temp password for ${founder.email}:`, updateAuthErr.message);
      continue;
    }

    // 2. Mark must_change_password and expiration in admin_profiles
    const { error: profileErr } = await supabase.from('admin_profiles').update({
      must_change_password: true,
      temp_password_active: true,
      temp_password_expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString()
    }).eq('id', user.id);

    if (profileErr) {
      console.error(`Failed to update admin profile for ${founder.email}:`, profileErr.message);
      continue;
    }

    // 3. Record audit event
    const emailHash = crypto.createHash('sha256').update(founder.email).digest('hex').substring(0, 16);
    await supabase.from('auth_audit_logs').insert({
      event_type: 'temp_credentials_provisioned',
      user_id: user.id,
      email_hash: emailHash,
      ip_hash: '127.0.0.1',
      status: 'success',
      details: 'Operator provisioned 24h temporary credentials with forced password change'
    });

    credentialsToDeliver.push({
      founder: founder.fullName,
      email: founder.email,
      role: founder.role,
      tempPassword,
      expiresAt: expiresAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    });
  }

  console.log(`\nSuccessfully provisioned temporary credentials for ${credentialsToDeliver.length} founders.`);
  console.log(`Validity Window: 24 Hours (Expires: ${expiresAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })})`);
  console.log('Policy: Forced password change immediately upon first sign-in.');
  console.log('Access Restriction: All privileged operations locked until permanent password is set.\n');

  console.log('--------------------------------------------------------------------');
  console.log('ONE-TIME OPERATOR DELIVERY SLIPS (Deliver individually to founders):');
  console.log('--------------------------------------------------------------------');

  credentialsToDeliver.forEach((c, idx) => {
    console.log(`\n[FOUNDER #${idx + 1}]`);
    console.log(`Name:             ${c.founder}`);
    console.log(`Email:            ${c.email}`);
    console.log(`Assigned Role:    ${c.role}`);
    console.log(`Temporary Pass:   ${c.tempPassword}`);
    console.log(`Valid Until:      ${c.expiresAt}`);
    console.log(`Action Required:  Sign in at https://primeora-solutions.netlify.app/admin/login and immediately choose a permanent private password.`);
  });

  console.log('\n====================================================================');
  console.log('NOTICE: Do not copy these credentials to version control, public reports,');
  console.log('or shared repositories. Deliver each slip privately to the intended founder.');
  console.log('====================================================================\n');
}

main().catch(console.error);
