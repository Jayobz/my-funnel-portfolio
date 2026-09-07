# Deployment Guide - AI-Native Portfolio

## Pre-Deployment Checklist

- [x] All TypeScript compiles without errors
- [x] All animations are smooth and performant  
- [x] Responsive design tested on mobile/tablet/desktop
- [x] Accessibility features implemented (ARIA labels, keyboard nav, reduced-motion)
- [x] AI API integration working with fallback
- [x] Contact form UI complete

## 1. Local Testing

```bash
npm install
npm run dev
```

Visit http://localhost:3000 and test:
- [ ] Chat interface responds to messages
- [ ] Avatar animates through states
- [ ] Portfolio sections appear based on questions
- [ ] Quick prompt suggestions work
- [ ] Contact form displays correctly
- [ ] Navigation links scroll properly

## 2. Environment Setup

### Create `.env.local`
```env
OPENAI_API_KEY=sk-...  # Get from OpenAI dashboard
NEXT_PUBLIC_AI_MODEL=gpt-3.5-turbo
```

**To get your API key:**
1. Go to https://platform.openai.com/api-keys
2. Create new secret key (keep it private!)
3. Add to `.env.local` (NEVER commit this file)

### Verify `.env.local` is in `.gitignore`
Already handled ✓

## 3. Production Build

```bash
npm run build
```

Verify output shows:
- ✓ Compiled successfully
- ✓ TypeScript check passed
- ✓ Routes generated (/, /api/chat)

## 4. Deploy to Vercel (Recommended)

### Option A: GitHub + Vercel (Easiest)

1. Push to GitHub:
```bash
git add .
git commit -m "AI-native portfolio complete"
git push origin main
```

2. Import to Vercel:
   - Go to https://vercel.com/new
   - Select your GitHub repo
   - Skip "Create from template"
   - Add environment variables:
     - `OPENAI_API_KEY` = your secret key
   - Deploy

### Option B: Deploy via CLI

```bash
npm install -g vercel
vercel --prod
```

Follow prompts and add environment variables through Vercel dashboard.

## 5. Deploy to Other Platforms

### Netlify (with Node functions)
```bash
npm run build
netlify deploy --prod --dir=.next
```

### Railway.app
1. Connect GitHub repo
2. Set `OPENAI_API_KEY` in environment
3. Auto-deploys on push

### Self-hosted (Docker)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 6. Post-Deployment

### Test Live Site
- [ ] Visit deployed URL
- [ ] Test chat with actual OpenAI responses
- [ ] Verify all portfolio sections appear
- [ ] Test contact form
- [ ] Check mobile responsiveness

### Monitor Performance
- Vercel Analytics dashboard shows real usage
- Lighthouse score target: 90+ (performant animations)
- Core Web Vitals optimized

### Update Portfolio Data
Edit `src/data/portfolio.ts` to update:
- Skills, experience, projects
- Contact information
- Resume link
- Service offerings

Redeploy after changes:
```bash
git add src/data/portfolio.ts
git commit -m "Update portfolio data"
git push origin main
# Auto-redeploys on Vercel
```

## 7. Customization After Launch

### Change AI Model
Edit `.env.local`:
```env
NEXT_PUBLIC_AI_MODEL=gpt-4-turbo  # More expensive, smarter
NEXT_PUBLIC_AI_MODEL=gpt-3.5-turbo  # Cheaper, faster
```

### Adjust Chat Behavior
Edit `src/app/api/chat/route.ts`:
- Modify system prompt for different tone
- Adjust temperature (0.0 = deterministic, 1.0 = creative)
- Add new panel detection keywords

### Style Tweaks
- Colors: Edit Tailwind classes (from-emerald-400, bg-[#050b14])
- Fonts: Edit next.config.ts or add Google Fonts
- Layout: Modify `max-w-7xl` breakpoints in components

## 8. Troubleshooting

### "401 Unauthorized" on /api/chat
- [ ] Check OPENAI_API_KEY in `.env.local`
- [ ] Verify API key is valid (not expired)
- [ ] Ensure it's set in Vercel environment variables (not just local)

### Animations stuttering
- [ ] Check if running on older device
- [ ] Verify Framer Motion is loaded (check DevTools)
- [ ] Reduced-motion respect: System may have reduced-motion enabled

### Build fails with TypeScript errors
- [ ] Run `npm run type-check` to see all errors
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Reinstall: `rm -rf node_modules && npm install`

### Chat responses not appearing
- [ ] Open browser DevTools → Network tab
- [ ] Check if `/api/chat` request succeeds
- [ ] Look for error message in Console tab
- [ ] Verify OpenAI API key is valid

## 9. Monitoring & Maintenance

### Weekly
- Check error logs in Vercel dashboard
- Monitor API costs (OpenAI)

### Monthly
- Review chat analytics (how people interact)
- Update portfolio data if needed
- Check broken links

### Quarterly
- Update dependencies: `npm update`
- Review performance metrics
- Consider feature additions

## 10. Security Notes

⚠️ **CRITICAL:**
- NEVER commit `.env.local` to GitHub
- NEVER expose `OPENAI_API_KEY` in frontend code
- Keep API key rotated (regenerate monthly)
- Monitor API usage for unusual activity

✅ **Safe Practices:**
- All API calls go through `/api/chat` (server-side only)
- API key is server-only (not sent to browser)
- Portfolio data is public (no sensitive info)
- Contact form doesn't actually send email (add backend for that)

## Questions?

For help:
1. Check build logs: `npm run build`
2. Test locally first: `npm run dev`
3. Verify environment variables
4. Review component code in `src/components/`
5. Check API response in DevTools Network tab

---

**Deployment Status:** Ready for production ✅
