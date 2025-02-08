const admin = require("firebase-admin");
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	storageBucket: "gs://monster-manual.appspot.com",
});

const bucket = admin.storage().bucket();
const folderPath = "images/"; // Replace with the folder you want to update

// Function to update metadata for all files in a folder
async function updateMetadataForFolder() {
	const [files] = await bucket.getFiles({ prefix: folderPath });

	for (const file of files) {
		try {
			const newMetadata = {
				cacheControl: "public, max-age=2592000", // Cache for 1 month
			};

			await file.setMetadata(newMetadata);
			console.log(`Metadata updated for: ${file.name}`);
		} catch (err) {
			console.error(
				`Error updating metadata for file ${file.name}:`,
				err
			);
		}
	}
}

updateMetadataForFolder();
