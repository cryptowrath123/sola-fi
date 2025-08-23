# Firebase Deployment Instructions

## 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

## 2. Login to Firebase
```bash
firebase login
```

## 3. Initialize Firebase in your project (if not already done)
```bash
firebase init firestore
```
- Select your existing project (sola-fi)
- Use the default rules file location (firestore.rules)
- Use the default indexes file location (firestore.indexes.json)

## 4. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

## Alternative: Manual Setup in Firebase Console

1. Go to https://console.firebase.google.com/
2. Select your project (sola-fi)
3. Go to Firestore Database
4. Click on "Rules" tab
5. Replace the existing rules with the content from `firestore.rules`
6. Click "Publish"

## Test Rules
After deploying, test your app again. The permissions error should be resolved.

## Security Rules Explanation

The rules allow:
- Users to read/write their own profile data
- Users to read other users' profiles (for email-to-wallet lookup)
- Users to create and read transactions they're involved in
- Users to manage their own wallet balances

These rules ensure data security while allowing necessary functionality.
