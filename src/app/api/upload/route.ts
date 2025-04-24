import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Bucket name
const bucketName = process.env.AWS_BUCKET_NAME;

export async function POST(request) {
  try {
    // Parse the FormData
    const formData = await request.formData();
    const file = formData.get('file');
    const fileType = formData.get('fileType') || 'book'; // 'book', 'cover', 'preview'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Extract content type and generate filename
    const contentType = file.type;
    const originalFilename = formData.get('filename') || file.name.replace(/\s+/g, '-');
    const filename = `${uuidv4()}-${originalFilename}`;
    
    // Set folder based on file type
    let folder;
    switch(fileType) {
      case 'cover':
        folder = 'covers/';
        break;
      case 'preview':
        folder = 'previews/';
        break;
      case 'book':
      default:
        folder = 'books/';
    }
    
    // Set up the S3 upload parameters for pre-signed URL
    const key = `${folder}${filename}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    // Generate a pre-signed URL (valid for 5 minutes)
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    
    // Construct the public URL for the file once it's uploaded
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
    return NextResponse.json({ 
      presignedUrl,
      fileUrl,
      key,
      contentType
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL: ' + error.message },
      { status: 500 }
    );
  }
}