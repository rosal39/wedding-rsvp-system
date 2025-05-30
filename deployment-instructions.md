# Wedding RSVP System Deployment Guide

## Overview
This guide will help you deploy two separate applications:
1. **Guest RSVP App** - For embedding in your Wix wedding website
2. **Admin Dashboard** - For managing responses privately

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Deploy Guest App
1. Create a new repository with the guest app code
2. Deploy to Vercel at `your-wedding-rsvp.vercel.app`
3. This will be embedded in your Wix site

### Step 2: Deploy Admin App
1. Create a separate repository with the admin app code
2. Deploy to Vercel at `your-wedding-admin.vercel.app`
3. Keep this URL private - only share with wedding planners

### Step 3: Integrate with Wix

#### Method A: HTML Embed (Recommended)
1. In Wix Editor, add an "HTML iframe" element
2. Use this code:
\`\`\`html
<iframe 
  src="https://your-wedding-rsvp.vercel.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px;">
</iframe>
\`\`\`

#### Method B: Custom Code
1. Go to Wix Editor → Settings → Custom Code
2. Add this to the head section:
\`\`\`html
<script>
  window.addEventListener('message', function(event) {
    if (event.data.type === 'resize') {
      const iframe = document.getElementById('rsvp-iframe');
      if (iframe) {
        iframe.style.height = event.data.height + 'px';
      }
    }
  });
</script>
\`\`\`

## Option 2: Deploy to Netlify

### Step 1: Build the Apps
\`\`\`bash
# For guest app
npm run build:guest

# For admin app  
npm run build:admin
\`\`\`

### Step 2: Deploy
1. Drag and drop the build folders to Netlify
2. Guest app: `your-wedding-rsvp.netlify.app`
3. Admin app: `your-wedding-admin.netlify.app`

## Security Considerations

### Guest App Security
- No sensitive data exposed
- Guest list validation happens client-side
- Responses stored securely

### Admin App Security
- Password protection (change the default password!)
- Session-based authentication
- Separate deployment from guest app

## Database Integration (Production)

For production use, replace localStorage with a real database:

### Option A: Supabase (Recommended)
\`\`\`javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'your-supabase-url',
  'your-supabase-anon-key'
)

// Save RSVP response
const { data, error } = await supabase
  .from('rsvp_responses')
  .insert([response])
\`\`\`

### Option B: Airtable
\`\`\`javascript
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'your-api-key'}).base('your-base-id');

base('RSVP Responses').create([
  {
    "fields": response
  }
]);
\`\`\`

## Customization

### Update Guest List
Edit the `SAMPLE_GUEST_LIST` array in `guest-rsvp-app.tsx`

### Change Admin Password
Update the `ADMIN_PASSWORD` constant in `admin-rsvp-app.tsx`

### Styling
- Modify colors in `tailwind.config.ts`
- Update fonts in `app/globals.css`
- Customize animations in component files

## Testing

### Test Guest Flow
1. Visit your guest app URL
2. Try logging in with sample guest data
3. Complete the RSVP process

### Test Admin Access
1. Visit your admin app URL
2. Login with admin password: `wedding2026admin`
3. Verify responses appear correctly

## Support

If you need help with deployment or customization:
1. Check the deployment logs in Vercel/Netlify
2. Test locally first with `npm run dev`
3. Ensure all environment variables are set correctly
