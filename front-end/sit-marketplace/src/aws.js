import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_AWS_REGION || 'us-west-1',
});

const s3 = new AWS.S3();

export const uploadFileToS3 = async (file) => {
    const params = {
        Bucket: process.env.VITE_AWS_S3_BUCKET_NAME,
        Key: file.name,
        Body: file,
        ACL: 'public-read' // or another ACL according to your requirements
    };

    try {
        await s3.upload(params).promise();
        const url = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${encodeURIComponent(params.Key)}`;
        return url;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
};