# Firestore Troubleshooting Guide

## Error: `ERR_BLOCKED_BY_CLIENT`

This error occurs when Firestore requests are being blocked. Here are the most common causes and solutions:

### 1. **Browser Extensions / Ad Blockers**

The most common cause is browser extensions (especially ad blockers) blocking Firebase/Firestore requests.

**Solution:**
- Disable ad blockers (uBlock Origin, AdBlock Plus, etc.) for your localhost
- Add `localhost` or `127.0.0.1` to your ad blocker's whitelist
- Disable all browser extensions temporarily to test
- Try in an incognito/private window with extensions disabled

### 2. **Firestore Not Enabled in Firebase Console**

Firestore might not be enabled for your Firebase project.

**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `school-management-2026`
3. Navigate to **Firestore Database** in the left sidebar
4. If you see a "Create database" button, click it
5. Choose **Start in test mode** (for development) or configure security rules
6. Select a location (choose closest to your users)
7. Click **Enable**

### 3. **Firestore Security Rules**

Your Firestore security rules might be blocking requests.

**Solution:**
1. Go to Firebase Console > Firestore Database > Rules
2. For development, use these test rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

**⚠️ Warning:** These rules allow all reads/writes. Use proper security rules for production (see `FIRESTORE_SETUP.md`).

### 4. **Network/CORS Issues**

If you're behind a corporate firewall or VPN, it might be blocking Firebase requests.

**Solution:**
- Try a different network
- Disable VPN temporarily
- Check if corporate firewall is blocking `firestore.googleapis.com`

### 5. **Firebase Project Configuration**

Verify your Firebase configuration is correct.

**Check:**
1. Open `src/integrations/firebase/config.ts`
2. Verify the `projectId` matches your Firebase project: `school-management-2026`
3. Make sure you're using the correct Firebase config credentials

### 6. **Browser Console - More Details**

Check the browser console for more specific error messages that might indicate:
- Authentication issues
- Permission denied errors
- Network connectivity problems

### Quick Test

To test if Firestore is accessible:

1. Open browser console
2. Run:
```javascript
import { db } from './src/integrations/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

getDocs(collection(db, 'profiles'))
  .then(snapshot => console.log('✅ Firestore working!', snapshot.size, 'documents'))
  .catch(error => console.error('❌ Firestore error:', error));
```

### Still Having Issues?

1. **Check Firebase Console:**
   - Go to Firebase Console > Project Settings
   - Verify your project ID: `school-management-2026`
   - Check if Firestore is enabled

2. **Test in Different Browser:**
   - Try Chrome, Firefox, or Edge
   - Test in incognito mode

3. **Verify Network Tab:**
   - Open Developer Tools > Network tab
   - Filter by "firestore"
   - Check if requests are being sent and what response you get

4. **Check Firebase Status:**
   - Visit [Firebase Status Page](https://status.firebase.google.com/)
   - Ensure there are no service disruptions

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `ERR_BLOCKED_BY_CLIENT` | Browser extension blocking requests | Disable ad blockers, whitelist localhost |
| `Permission denied` | Security rules blocking access | Update Firestore security rules |
| `Firestore is not enabled` | Firestore not created in project | Enable Firestore in Firebase Console |
| `Network error` | Connectivity issue | Check internet connection, disable VPN |
| `Missing or insufficient permissions` | Security rules too restrictive | Update security rules |

## Need More Help?

- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Support](https://firebase.google.com/support)

