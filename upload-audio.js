#!/usr/bin/env node

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin without credentials file - uses Application Default Credentials
// This will work if you're logged in via Firebase CLI
try {
  admin.initializeApp({
    storageBucket: 'hands-detail.appspot.com'
  });
} catch (error) {
  console.log('Firebase already initialized or credentials issue. Trying to use config...');
}

const bucket = admin.storage().bucket();

async function uploadAudioFiles() {
  try {
    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
      console.error(`✗ Audio directory not found: ${audioDir}`);
      process.exit(1);
    }

    const audioFiles = fs.readdirSync(audioDir).filter(file =>
      ['.mp3', '.wav', '.m4a', '.ogg'].includes(path.extname(file).toLowerCase())
    );

    console.log(`Found ${audioFiles.length} audio files to upload\n`);

    const uploadedFiles = [];

    for (const file of audioFiles) {
      const filePath = path.join(audioDir, file);
      const fileSize = fs.statSync(filePath).size;
      const fileSizeMB = (fileSize / 1024 / 1024).toFixed(2);
      const fileName = `audio/${file}`;
      
      console.log(`\n⏳ Uploading: ${file} (${fileSizeMB} MB)`);
      
      try {
        await bucket.upload(filePath, {
          destination: fileName,
          metadata: {
            cacheControl: 'public, max-age=31536000',
            contentType: 'audio/mpeg'
          }
        });

        // Generate the download URL
        const url = `https://firebasestorage.googleapis.com/v0/b/hands-detail.appspot.com/o/audio%2F${encodeURIComponent(file)}?alt=media`;
        
        uploadedFiles.push({
          fileName: file,
          firebaseUrl: url,
          uploadedAt: new Date().toISOString()
        });

        console.log(`✓ Upload successful`);
        console.log(`  Firebase URL: ${url}`);
      } catch (error) {
        console.error(`✗ Upload failed: ${error.message}`);
      }
    }

    // Save URLs to a config file
    if (uploadedFiles.length > 0) {
      const configFile = path.join(__dirname, 'audio-urls.json');
      fs.writeFileSync(configFile, JSON.stringify(uploadedFiles, null, 2));
      console.log(`\n✓ Saved URLs to audio-urls.json\n`);

      // Display summary
      console.log('=== Upload Summary ===');
      uploadedFiles.forEach(file => {
        console.log(`\n${file.fileName}`);
        console.log(`${file.firebaseUrl}`);
      });
    } else {
      console.log('\n⚠ No files were successfully uploaded');
    }

  } catch (error) {
    console.error('Error during upload:', error.message);
    process.exit(1);
  }
}

uploadAudioFiles().then(() => {
  console.log('\n✓ All operations completed');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
