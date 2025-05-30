# Wedding RSVP Deployment Guide

## Step 1: Create Two Separate Vercel Projects

### Option A: Deploy from GitHub (Recommended)

1. **Create two separate repositories:**
   - `wedding-rsvp-guest` (contains only guest-app files)
   - `wedding-rsvp-admin` (contains only admin-app files)

2. **Deploy Guest App:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import `wedding-rsvp-guest` repository
   - Set environment variables:
     \`\`\`
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     \`\`\`
   - Deploy → You'll get: `https://wedding-rsvp-guest.vercel.app`

3. **Deploy Admin App:**
   - Click "New Project" again
   - Import `wedding-rsvp-admin` repository
   - Set environment variables:
     \`\`\`
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
     \`\`\`
   - Deploy → You'll get: `https://wedding-rsvp-admin.vercel.app`

### Option B: Deploy from CLI

1. **Install Vercel CLI:**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Deploy Guest App:**
   \`\`\`bash
   cd guest-app
   vercel --prod
   \`\`\`

3. **Deploy Admin App:**
   \`\`\`bash
   cd admin-app
   vercel --prod
   \`\`\`

## Step 2: Configure Environment Variables

In both Vercel projects, add these environment variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-admin-password
\`\`\`

## Step 3: Embed Guest App in Wix

### Method 1: HTML Embed Element

1. In Wix Editor, add "HTML iframe" element
2. Use this code:

\`\`\`html
<iframe 
  src="https://your-guest-app.vercel.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px; background: transparent;">
</iframe>

<script>
// Auto-resize iframe based on content
window.addEventListener('message', function(event) {
  if (event.data.type === 'resize') {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.style.height = event.data.height + 'px';
    }
  }
});
</script>
\`\`\`

### Method 2: Custom Code Section

1. Go to Wix Editor → Settings → Custom Code
2. Add to `<head>` section:

\`\`\`html
<style>
  .rsvp-container {
    width: 100%;
    min-height: 800px;
    border: none;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
\`\`\`

3. Add to page where you want RSVP:

\`\`\`html
<div class="rsvp-container">
  <iframe 
    src="https://your-guest-app.vercel.app" 
    width="100%" 
    height="800px" 
    frameborder="0">
  </iframe>
</div>
\`\`\`

## Step 4: Test Your Deployment

### Test Guest App:
1. Visit your guest app URL
2. Try logging in with a test guest from your database
3. Complete the RSVP flow

### Test Admin App:
1. Visit your admin app URL (keep this private!)
2. Login with your admin password
3. Verify you can see RSVP responses

## Step 5: Update Guest List

Add your real guests to Supabase:

\`\`\`sql
INSERT INTO guests (name, email, plus_one) VALUES
('Bride Name', 'bride@email.com', false),
('Groom Name', 'groom@email.com', false),
('Guest 1', 'guest1@email.com', true),
('Guest 2', 'guest2@email.com', false);
\`\`\`

## Troubleshooting

### "Deployment not found" error:
- Make sure you're using the correct Vercel URL
- Check that the deployment is live in Vercel dashboard
- Verify environment variables are set

### RSVP not saving:
- Check Supabase connection in browser console
- Verify environment variables match your Supabase project
- Check RLS policies are correctly set

### Iframe not loading in Wix:
- Ensure your Vercel app allows iframe embedding
- Check for CORS issues in browser console
- Try using a different embed method

## Security Notes

1. **Keep admin URL private** - only share with wedding planners
2. **Change default admin password** - use a strong, unique password
3. **Monitor access logs** - check who's accessing your admin panel
4. **Backup your data** - export responses regularly

## Support

If you need help:
1. Check Vercel deployment logs
2. Check Supabase logs for database errors
3. Test locally first with `npm run dev`
4. Verify all environment variables are correct
